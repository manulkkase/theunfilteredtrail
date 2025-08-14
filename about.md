---
layout: default
title: About The Curious Wanderer | The Unfiltered Trail
description: Meet the person behind The Unfiltered Trail. From Aussie backpacker to Seoul-Saigon local insider.
---



<section class="container" style="padding-top: 2rem;">
    <header class="post-header">
        <h1>The Unfiltered Trail</h1>
        <h2>My Homelands, Your Adventure.</h2>
        <p>Ever wonder what a city looks like to someone who grew up there?</p>
    </header>

    <div class="post-content">
        <p>Originating from the fast-paced streets of Seoul and having a partner from the vibrant chaos of Saigon, the journey began. After meeting, falling in love, and settling in Australia, this blog was born as a passion project—a guide reflecting a unique family story.</p>

        <p>Trips "home" have evolved over the years: first rediscovering a childhood city, then exploring a partner's, and now navigating both with a stroller and a list of kid-friendly cafes.</p>

        <h3>The Secret Weapon</h3>
        <p>All the insights about Korea come from a lifetime of personal experience. For Saigon, there's a secret weapon: a partner who provides every authentic restaurant tip, hidden gem, and cultural insight about Vietnam. In this blog, the storytelling combines Seoul roots and Saigon soul, all from the perspective of a parent living in Australia.</p>

        <h3>The Promise:</h3>
        <ul>
            <li><strong>Two Locals' Knowledge:</strong> Ground-level stories from Seoul and lifelong wisdom from Saigon.</li>
            <li><strong>The Parent Perspective:</strong> Honest advice on what truly works for a family on the move.</li>
            <li><strong>A Real, Honest Guide:</strong> Insight into which "must-see" is skippable and which hole-in-the-wall will be the highlight of your trip.</li>
            <li><strong>Bridging Cultures:</strong> Guidance on navigating the nuances of both cultures for confident travel.</li>
        </ul>

        <p>Join this journey through these homelands, from a unique perspective to yours.</p>
    </div>
</section>

<!-- Newsletter Section -->
<section class="newsletter">
    <div class="container">
        <h2>Join the Trail Community</h2>
        <p>Monthly updates, local insights, and zero tourist trap recommendations.</p>
        <form class="newsletter-form" id="newsletterForm">
            <input type="email" placeholder="Enter your email" required>
            <button type="submit">Subscribe</button>
        </form>
    </div>
</section>

<script>
    // Newsletter form
    document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            alert('Thanks for subscribing! Check your email for confirmation.');
            e.target.querySelector('input[type="email"]').value = '';
        } catch (error) {
            alert('Something went wrong. Please try again later.');
        }
    });
</script>