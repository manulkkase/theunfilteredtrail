// GitHub에서 _posts 폴더의 마크다운 파일을 읽어와서 포스트를 표시하는 JavaScript

class PostsLoader {
    constructor() {
        this.posts = [];
        this.displayedPosts = [];
        this.githubRepo = 'manulkkase/theunfilteredtrail';
        this.postsPath = '_posts';
        this.postsPerPage = 6;
        this.currentPage = 0;
        this.isLoading = false;
    }

    // GitHub API를 통해 _posts 폴더의 파일 목록 가져오기
    async fetchPostsList() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.githubRepo}/contents/${this.postsPath}`);
            const files = await response.json();
            
            if (Array.isArray(files)) {
                return files.filter(file => file.name.endsWith('.md'));
            }
            return [];
        } catch (error) {
            console.error('Error fetching posts list:', error);
            return [];
        }
    }

    // GitHub raw content에서 마크다운 파일 내용 가져오기
    async fetchPostContent(file) {
        try {
            const response = await fetch(`https://raw.githubusercontent.com/${this.githubRepo}/main/${this.postsPath}/${file.name}`);
            const content = await response.text();
            return this.parseMarkdown(content, file.name);
        } catch (error) {
            console.error(`Error fetching ${file.name}:`, error);
            return null;
        }
    }

    // 마크다운 파일을 파싱해서 포스트 객체로 변환
    parseMarkdown(content, filename) {
        const lines = content.split('\n');
        const post = {
            filename: filename,
            frontmatter: {},
            body: ''
        };

        let inFrontmatter = false;
        let frontmatterEnd = 0;

        // Frontmatter 파싱
        if (lines[0] === '---') {
            inFrontmatter = true;
            for (let i = 1; i < lines.length; i++) {
                if (lines[i] === '---') {
                    frontmatterEnd = i;
                    break;
                }
                const line = lines[i];
                const colonIndex = line.indexOf(':');
                if (colonIndex > -1) {
                    const key = line.substring(0, colonIndex).trim();
                    const value = line.substring(colonIndex + 1).trim();
                    post.frontmatter[key] = value.replace(/^["']|["']$/g, ''); // 따옴표 제거
                }
            }
        }

        // 본문 내용
        post.body = lines.slice(frontmatterEnd + 1).join('\n').trim();

        // 파일명에서 날짜와 슬러그 추출
        const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
        if (match) {
            post.date = match[1];
            post.slug = match[2];
        }

        // 제목이 없으면 파일명에서 생성
        if (!post.frontmatter.title) {
            post.frontmatter.title = post.slug ? post.slug.replace(/-/g, ' ') : filename;
        }

        // excerpt 생성 (본문의 첫 150자)
        post.excerpt = post.body.substring(0, 150) + (post.body.length > 150 ? '...' : '');

        return post;
    }

    // 모든 포스트 로드
    async loadAllPosts() {
        try {
            const files = await this.fetchPostsList();
            const postPromises = files.map(file => this.fetchPostContent(file));
            const posts = await Promise.all(postPromises);
            
            this.posts = posts
                .filter(post => post !== null)
                .sort((a, b) => new Date(b.date || b.frontmatter.date) - new Date(a.date || a.frontmatter.date));
            
            return this.posts;
        } catch (error) {
            console.error('Error loading posts:', error);
            return [];
        }
    }

    // 포스트를 HTML로 렌더링
    renderPosts(posts, containerId = 'postsGrid') {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (posts.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--white); border-radius: 16px; box-shadow: 0 8px 30px rgba(30, 58, 95, 0.1);">
                    <div style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;">📝</div>
                    <h3 style="color: var(--primary); margin-bottom: 1rem; font-family: 'Playfair Display', serif;">No Posts Yet</h3>
                    <p style="color: var(--light); margin-bottom: 2rem;">Create your first post using the admin panel!</p>
                    <a href="admin/" class="btn btn-primary">✨ Create First Post</a>
                </div>
            `;
            return;
        }

        container.innerHTML = posts.map(post => {
            const title = post.frontmatter.title || 'Untitled';
            const date = new Date(post.frontmatter.date || post.date);
            const formattedDate = date.toLocaleDateString('en-AU', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            // Handle both /assets/images/ and /images/ paths
            let featuredImage = post.frontmatter.featured_image || '/images/Whisk_a35f7a9c81.jpg';
            if (featuredImage.startsWith('/assets/')) {
                featuredImage = featuredImage.replace('/assets/', '/');
            }
            const excerpt = post.excerpt || 'No excerpt available';
            
            // Get category for display and linking
            const category = post.frontmatter.category || post.frontmatter.categories || 'Uncategorized';
            const displayCategory = Array.isArray(category) ? category[0] : category;
            
            // Generate post URL
            const fallbackUrl = `post.html?slug=${post.slug}`;
            
            return `
                <article class="card">
                    <a href="${fallbackUrl}" style="text-decoration: none; color: inherit; display: block;">
                        <img src="${featuredImage}" alt="${title}" loading="lazy" onerror="this.src='/images/Whisk_a35f7a9c81.jpg'">
                        <div class="card-content">
                            <div class="card-meta">
                                <a href="category.html?category=${encodeURIComponent(displayCategory)}" class="card-category" style="text-decoration: none; color: inherit; transition: color 0.3s ease;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='inherit'">${displayCategory}</a>
                                <time datetime="${post.frontmatter.date || post.date}">${formattedDate}</time>
                            </div>
                            <h3>${title}</h3>
                            <p class="card-excerpt">${excerpt}</p>
                            <div class="card-author">
                                <span>👤 The Curious Wanderer</span>
                            </div>
                        </div>
                    </a>
                </article>
            `;
        }).join('');
    }

    // Load More 기능을 위한 초기 포스트 렌더링
    renderInitialPosts(posts, containerId = 'postsGrid') {
        this.posts = posts;
        this.displayedPosts = [];
        this.currentPage = 0;
        
        const container = document.getElementById(containerId);
        if (!container) return;

        if (posts.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--white); border-radius: 16px; box-shadow: 0 8px 30px rgba(30, 58, 95, 0.1);">
                    <div style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;">📝</div>
                    <h3 style="color: var(--primary); margin-bottom: 1rem; font-family: 'Playfair Display', serif;">No Posts Yet</h3>
                    <p style="color: var(--light); margin-bottom: 2rem;">Create your first post using the admin panel!</p>
                    <a href="admin/" class="btn btn-primary">✨ Create First Post</a>
                </div>
            `;
            this.hideLoadMoreButton();
            return;
        }

        // 초기 포스트들 렌더링
        container.innerHTML = '';
        this.loadMorePosts();
    }

    // 더 많은 포스트 로드하기
    loadMorePosts() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoadingState();

        // 다음 페이지의 포스트들 가져오기
        const startIndex = this.currentPage * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const newPosts = this.posts.slice(startIndex, endIndex);

        // 애니메이션을 위한 딜레이
        setTimeout(() => {
            this.appendPosts(newPosts);
            this.displayedPosts = this.displayedPosts.concat(newPosts);
            this.currentPage++;
            this.updateLoadMoreButton();
            this.isLoading = false;
        }, 800); // 로딩 애니메이션 시간
    }

    // 새 포스트들을 DOM에 추가 (fadeIn 애니메이션과 함께)
    appendPosts(posts) {
        const container = document.getElementById('postsGrid');
        if (!container || posts.length === 0) return;

        const postsHTML = posts.map(post => {
            const title = post.frontmatter.title || 'Untitled';
            const date = new Date(post.frontmatter.date || post.date);
            const formattedDate = date.toLocaleDateString('en-AU', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            // Get category for display and linking
            const category = post.frontmatter.category || post.frontmatter.categories || 'Uncategorized';
            const displayCategory = Array.isArray(category) ? category[0] : category;
            
            // Handle both /assets/images/ and /images/ paths
            let featuredImage = post.frontmatter.featured_image || '/images/Whisk_a35f7a9c81.jpg';
            if (featuredImage.startsWith('/assets/')) {
                featuredImage = featuredImage.replace('/assets/', '/');
            }
            const excerpt = post.excerpt || 'No excerpt available';
            
            // Generate post URL
            const fallbackUrl = `post.html?slug=${post.slug}`;
            
            return `
                <article class="card post-card-new" style="opacity: 0; transform: translateY(20px);">
                    <a href="${fallbackUrl}" style="text-decoration: none; color: inherit; display: block;">
                        <img src="${featuredImage}" alt="${title}" loading="lazy" onerror="this.src='/images/Whisk_a35f7a9c81.jpg'">
                        <div class="card-content">
                            <div class="card-meta">
                                <a href="category.html?category=${encodeURIComponent(displayCategory)}" class="card-category" style="text-decoration: none; color: inherit; transition: color 0.3s ease;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='inherit'">${displayCategory}</a>
                                <time datetime="${post.frontmatter.date || post.date}">${formattedDate}</time>
                            </div>
                            <h3>${title}</h3>
                            <p class="card-excerpt">${excerpt}</p>
                            <div class="card-author">
                                <span>👤 The Curious Wanderer</span>
                            </div>
                        </div>
                    </a>
                </article>
            `;
        }).join('');

        // 새 포스트들을 DOM에 추가
        container.insertAdjacentHTML('beforeend', postsHTML);

        // fadeIn 애니메이션 적용
        setTimeout(() => {
            const newCards = container.querySelectorAll('.post-card-new');
            newCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.classList.remove('post-card-new');
                }, index * 100); // 순차적 애니메이션
            });
        }, 50);
    }

    // Load More 버튼 상태 업데이트
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        
        if (!loadMoreBtn || !loadMoreContainer) return;

        const remainingPosts = this.posts.length - this.displayedPosts.length;
        
        if (remainingPosts <= 0) {
            loadMoreContainer.innerHTML = `
                <div class="no-more-posts" style="text-align: center; padding: 2rem; color: var(--light);">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">✨</div>
                    <p style="font-size: 1.1rem; font-weight: 600;">You've seen all posts!</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">Check back later for new adventures.</p>
                </div>
            `;
        } else {
            loadMoreBtn.innerHTML = `Load More Posts (${remainingPosts} remaining)`;
            loadMoreBtn.disabled = false;
            loadMoreBtn.style.opacity = '1';
        }
    }

    // 로딩 상태 표시
    showLoadingState() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.innerHTML = `
                <span class="loading-spinner"></span>
                Loading Posts...
            `;
            loadMoreBtn.disabled = true;
            loadMoreBtn.style.opacity = '0.7';
        }
    }

    // Load More 버튼 숨기기
    hideLoadMoreButton() {
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        if (loadMoreContainer) {
            loadMoreContainer.style.display = 'none';
        }
    }

    // 카테고리별 필터링 기능
    filterPostsByCategory(category) {
        if (!category) return this.posts;
        
        return this.posts.filter(post => {
            const postCategory = post.frontmatter.category || post.frontmatter.categories;
            if (Array.isArray(postCategory)) {
                return postCategory.includes(category);
            }
            return postCategory === category;
        });
    }

    // 홈페이지용 필터링 및 검색 기능 개선
    setupHomeFilters() {
        const searchInput = document.getElementById('searchInput');
        const regionFilter = document.getElementById('regionFilter');
        const sortFilter = document.getElementById('sortFilter');
        const clearFiltersBtn = document.getElementById('clearFiltersBtn');
        const postsGrid = document.getElementById('postsGrid');

        if (!searchInput || !regionFilter || !sortFilter) return;

        const applyFilters = () => {
            const searchValue = searchInput.value.toLowerCase();
            const categoryValue = regionFilter.value;
            const sortValue = sortFilter.value;

            let filteredPosts = [...this.posts];

            // Apply category filter
            if (categoryValue) {
                filteredPosts = this.filterPostsByCategory(categoryValue);
            }

            // Apply search filter
            if (searchValue) {
                filteredPosts = filteredPosts.filter(post => {
                    const title = (post.frontmatter.title || '').toLowerCase();
                    const body = (post.body || '').toLowerCase();
                    const category = (post.frontmatter.category || '').toLowerCase();
                    return title.includes(searchValue) || body.includes(searchValue) || category.includes(searchValue);
                });
            }

            // Apply sorting
            if (sortValue === 'title') {
                filteredPosts.sort((a, b) => {
                    const titleA = a.frontmatter.title || '';
                    const titleB = b.frontmatter.title || '';
                    return titleA.localeCompare(titleB);
                });
            } else {
                filteredPosts.sort((a, b) => new Date(b.frontmatter.date || b.date) - new Date(a.frontmatter.date || a.date));
            }

            // Show/hide clear button
            const hasFilters = searchValue || categoryValue;
            if (clearFiltersBtn) {
                clearFiltersBtn.style.display = hasFilters ? 'block' : 'none';
            }

            // Render filtered posts
            this.renderPosts(filteredPosts);
        };

        const clearFilters = () => {
            searchInput.value = '';
            regionFilter.value = '';
            if (clearFiltersBtn) {
                clearFiltersBtn.style.display = 'none';
            }
            this.renderPosts(this.posts);
        };

        searchInput.addEventListener('input', applyFilters);
        regionFilter.addEventListener('change', applyFilters);
        sortFilter.addEventListener('change', applyFilters);
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', clearFilters);
        }
    }
}

// 포스트는 post.html 페이지로 직접 이동합니다

// 전역 인스턴스 생성
window.postsLoader = new PostsLoader();

// DOM 로드 완료 시 포스트 로드
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Loading posts from GitHub...');
    const posts = await window.postsLoader.loadAllPosts();
    console.log(`Loaded ${posts.length} posts:`, posts);
    
    // Load More 기능이 있는 페이지인지 확인
    if (document.getElementById('loadMoreContainer')) {
        window.postsLoader.renderInitialPosts(posts);
        
        // Load More 버튼 이벤트 리스너 추가
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                window.postsLoader.loadMorePosts();
            });
        }
    } else {
        // 기존 방식으로 모든 포스트 렌더링 (카테고리 페이지 등)
        window.postsLoader.renderPosts(posts);
    }
    
    // 홈페이지에서만 필터 기능 활성화
    if (document.getElementById('searchInput')) {
        window.postsLoader.setupHomeFilters();
    }
});