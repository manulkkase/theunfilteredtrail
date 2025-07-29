// GitHub에서 _posts 폴더의 마크다운 파일을 읽어와서 포스트를 표시하는 JavaScript

class PostsLoader {
    constructor() {
        this.posts = [];
        this.githubRepo = 'manulkkase/theunfilteredtrail';
        this.postsPath = '_posts';
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
            const featuredImage = post.frontmatter.featured_image || '/images/Whisk_a35f7a9c81.jpg';
            const excerpt = post.excerpt || 'No excerpt available';

            return `
                <article class="card">
                    <div onclick="openPost('${post.slug}')" style="cursor: pointer;">
                        <img src="${featuredImage}" alt="${title}" loading="lazy" onerror="this.src='/images/Whisk_a35f7a9c81.jpg'">
                        <div class="card-content">
                            <div class="card-meta">
                                <span class="card-category">Asia</span>
                                <time datetime="${post.frontmatter.date || post.date}">${formattedDate}</time>
                            </div>
                            <h3>${title}</h3>
                            <p class="card-excerpt">${excerpt}</p>
                            <div class="card-author">
                                <span>👤 Trail Explorer</span>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    }
}

// 포스트 클릭 시 개별 포스트 페이지로 이동
function openPost(slug) {
    // 임시로 alert으로 포스트 내용 표시 (나중에 모달이나 별도 페이지로 변경 가능)
    const post = window.postsLoader.posts.find(p => p.slug === slug);
    if (post) {
        alert(`Title: ${post.frontmatter.title}\n\nContent: ${post.body}`);
    }
}

// 전역 인스턴스 생성
window.postsLoader = new PostsLoader();

// DOM 로드 완료 시 포스트 로드
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Loading posts from GitHub...');
    const posts = await window.postsLoader.loadAllPosts();
    console.log(`Loaded ${posts.length} posts:`, posts);
    window.postsLoader.renderPosts(posts);
});