async function loadPapersList() {
    const papersList = document.getElementById('papers-list');
    const tagSearchInput = document.getElementById('tag-search');

    let papers = [];
    
    try {
        const response = await fetch('data/papers.json');
        papers = await response.json();
        displayPapers(papers);

        tagSearchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const filteredPapers = papers.filter(paper => 
                paper.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
            displayPapers(filteredPapers);
        });

    } catch (error) {
        console.error('Error loading papers list:', error);
        papersList.innerHTML = '<p>Failed to load papers.</p>';
    }
}

function displayPapers(papers) {
    const papersList = document.getElementById('papers-list');
    papersList.innerHTML = ''; 

    if (papers.length === 0) {
        papersList.innerHTML = '<p>No papers found for the selected tag.</p>';
        return;
    }

    papers.forEach(paper => {
        const listItem = document.createElement('li');
        listItem.style.marginBottom = "15px";

        const title = document.createElement('h3');
        const link = document.createElement('a');
        link.textContent = paper.title;

        if (paper.complete) {
            link.href = `post.html?file=${encodeURIComponent(paper.filename)}`;
            link.style.color = "#007BFF";
            link.style.textDecoration = "none";
        } else {
            link.style.color = "#999"; 
            link.style.cursor = "default";
        }

        title.appendChild(link);
        listItem.appendChild(title);

        const description = document.createElement('p');
        description.textContent = paper.description;
        description.style.fontSize = "0.9em";
        description.style.color = "#555";
        listItem.appendChild(description);

        const metaInfo = document.createElement('p');
        metaInfo.innerHTML = `
            <strong>Authors:</strong> ${paper.authors.join(', ')} | 
            <strong>Year:</strong> ${paper.year} | 
            <strong>Tags:</strong> ${paper.tags.join(', ')}
        `;
        metaInfo.style.fontSize = "0.85em";
        metaInfo.style.color = "#777";
        listItem.appendChild(metaInfo);

        papersList.appendChild(listItem);
    });
}

loadPapersList();
