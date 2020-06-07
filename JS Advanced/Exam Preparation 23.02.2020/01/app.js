function solve() {
   const creator = document.getElementById('creator');
   const title = document.getElementById('title');
   const category = document.getElementById('category');
   const content = document.getElementById('content');
   let btnCreate = document.querySelector('button.btn.create').addEventListener('click', createArticle);
   let articles = document.querySelectorAll('section')[1];
   let archiveArticles = document.querySelector('ul');

   function createArticle(e) {
      e.preventDefault();
      let article = document.createElement('article');
      let h1Title = document.createElement('h1');
      h1Title.value = title.value;
      let pCategory = document.createElement('p');
      pCategory.innerHTML = "Category:<br>" + `<strong>${category.value}</strong>`;
      let pCreator = document.createElement('p');
      pCreator.innerHTML = "Creator:<br>" + `<strong>${creator.value}</strong>`;
      let pContent = document.createElement('p');
      pContent.textContent = content.value;

      article.appendChild(h1Title);
      article.appendChild(pCategory);
      article.appendChild(pCreator);
      article.appendChild(pContent);

      let div = document.createElement('div');
      div.className = "buttons";
      let deleteBtn = document.createElement('button');
      deleteBtn.className = "btn delete";
      deleteBtn.textContent = "Delete";
      let archiveBtn = document.createElement('button');
      archiveBtn.className = "btn archive";
      archiveBtn.textContent = "Archive";

      div.appendChild(deleteBtn);
      div.appendChild(archiveBtn);
      article.appendChild(div);

      articles.appendChild(article);

      deleteBtn.addEventListener('click', () => {
         articles.removeChild(article);
      });
      archiveBtn.addEventListener('click', () => {
         let li = document.createElement('li');
         li.textContent = h1.value;
         archiveArticles.appendChild(li);
         articles.removeChild(article);
      })
   }
}