// Fetch the list of papers from the JSON file
async function loadPapersList() {
    const papersList = document.getElementById('papers-list');

    try {
        // Fetch the JSON file
        const response = await fetch('data/papers.json');
        const papers = await response.json();

        // Create a list item for each paper
        papers.forEach(paper => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');

            // Set the link to the post page with a query parameter for the filename
            link.href = `post.html?file=${encodeURIComponent(paper.filename)}`;
            link.textContent = paper.title;

            listItem.appendChild(link);
            papersList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error loading papers list:', error);
        papersList.innerHTML = '<p>Failed to load papers.</p>';
    }
}

// Load papers on page load
loadPapersList();
