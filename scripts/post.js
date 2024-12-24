// Function to get the query parameter from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to load and display the markdown content
async function loadMarkdownFile() {
    const blogPostContainer = document.getElementById('blog-post');

    // Get the markdown file name from the query parameter
    const fileName = getQueryParam('file');

    if (!fileName) {
        blogPostContainer.innerHTML = '<p>No file specified.</p>';
        return;
    }

    try {
        // Fetch the markdown file
        const response = await fetch(`papers/${fileName}`);
        const markdownText = await response.text();

        // Convert markdown to HTML using marked.js
        const htmlContent = marked.parse(markdownText);

        // Display the content
        blogPostContainer.innerHTML = htmlContent;
    } catch (error) {
        console.error('Error loading markdown file:', error);
        blogPostContainer.innerHTML = '<p>Failed to load content.</p>';
    }
}

// Load the markdown file on page load
loadMarkdownFile();
