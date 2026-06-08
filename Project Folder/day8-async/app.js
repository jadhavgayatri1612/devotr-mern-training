const postList = document.getElementById("postList");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("errorBox");
const reloadBtn = document.getElementById("reloadBtn");

let allPosts = [];

async function fetchPosts() {

    loading.style.display = "block";
    errorBox.style.display = "none";
    postList.innerHTML = "";

    try {
        await new Promise(resolve=> setTimeout(resolve,1000));
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        allPosts = data.slice(0, 10);

        displayPosts(allPosts);

    } catch (error) {

        errorBox.style.display = "block";
        errorBox.textContent = "Failed to load data. Please try again.";

    } finally {

        loading.style.display = "none";
    }
}

function displayPosts(posts) {

    postList.innerHTML = "";

    resultCount.textContent = `Results: ${posts.length}`;

    posts.forEach((post) => {

        const li = document.createElement("li");

        li.textContent = post.title;

        postList.appendChild(li);
    });
}

searchInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        const searchText = searchInput.value.toLowerCase();

        const filteredPosts = allPosts.filter((post) =>
            post.title.toLowerCase().includes(searchText)
        );

        displayPosts(filteredPosts);
    }
});

reloadBtn.addEventListener("click", fetchPosts);

fetchPosts();