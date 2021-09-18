const textbox = document.getElementById("search-field");
textbox.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        searchBook()
    }
});


const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs, data.numFound))

}


const displaySearchResult = (data, searchResult) => {

    const searchResultCount = document.getElementById('search-result-count');
    // search result count field clear
    searchResultCount.textContent = '';

    if (searchResult === 0) {
        searchResultCount.innerHTML = `<p class="fs-1 fw-bolder mt-5">No books found</p>`;
    }
    else if (searchResult !== data.length) {
        searchResultCount.innerHTML = `
                 <p class="fs-4"> Total ${searchResult} books found</p>
                 <p class="fs-4">Display to you ${data.length}</span> books</p>`;
    }


    // books results
    const searchResultDiv = document.getElementById('search-result');
    searchResultDiv.textContent = '';

    data.forEach(data => {
        let author = data?.author_name?.[0];
        let publisher = data?.publisher?.[0];
        let publishingYear = data?.publish_date?.[0];

        if (author === undefined) {
            author = 'Author name not found';
        }
        if (publisher === undefined) {
            publisher = 'Publisher name not found';
        }
        if (publishingYear === undefined) {
            publishingYear = 'Publishing year not found';
        }

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <img height="350px" src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text"><strong>Author of this book:</strong> ${author}</p>
            <p class="card-text"><strong>Publisher:</strong> ${publisher}</p>
            <p class="card-text"><strong>Publishing date:</strong> ${publishingYear}</p>
            </div>
        </div>
        `;
        searchResultDiv.appendChild(div);
    })
}




