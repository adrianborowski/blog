// Replace 'your-blog-url' with the Blogger URL of your blog
const blogUrl = "https://adrianborowski.blogspot.com/feeds/posts/default?alt=json";

// Function to slugify titles for SEO-friendly URLs
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word characters
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// Function to fetch and display blog posts
async function displayBlogPosts() {
  try {
    const response = await fetch(blogUrl);
    const data = await response.json();
    const posts = data.feed.entry;
    
    let blogPostsContainer = document.getElementById('blogposts');
    blogPostsContainer.innerHTML = ''; // Clear the container

    posts.forEach(post => {
      let title = post.title.$t;
      let content = post.content.$t;
      let publishedDate = post.published.$t;

      // Generate a clean URL slug for the post title
      let cleanUrl = slugify(title);
      let postUrl = `https://adrianborowski.com/${cleanUrl}`;

      // Create post elements
      let postElement = document.createElement('div');
      postElement.classList.add('blog-post');

      let postTitle = document.createElement('h2');
      let postLink = document.createElement('a');
      postLink.href = postUrl;
      postLink.innerText = title;
      postTitle.appendChild(postLink);

      let postContent = document.createElement('p');
      postContent.innerHTML = content;

      let postDate = document.createElement('small');
      postDate.innerText = `Published on: ${new Date(publishedDate).toLocaleDateString()}`;

      // Append elements to the blog post
      postElement.appendChild(postTitle);
      postElement.appendChild(postDate);
      postElement.appendChild(postContent);

      // Append the post to the container
      blogPostsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching blog posts: ", error);
  }
}

// Call the function to display the posts
displayBlogPosts();
