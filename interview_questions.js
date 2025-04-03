const questions = [
    { question: "What is HTML?", answer: "HTML stands for HyperText Markup Language. It is the standard language used to create and design documents on the World Wide Web. HTML structures web content and allows the inclusion of text, images, links, and other elements."},
    { question: "What are attributes in HTML?", answer: "Attributes provide additional information about HTML elements. They are included within the opening tag and usually come in name-value pairs."},
    { question: "What is the &lt;form&gt; tag used for in HTML?", answer: "The &lt;form&gt; tag is used to create an HTML form for user input. It can contain various form elements like text fields, checkboxes, radio buttons, and submit buttons."},
    { question: "How do you create a hyperlink that opens in a new tab?", answer: "To open a link in a new tab, use the target attribute with the value _blank."},
    { question: "What is the &lt;title&gt; tag used for?", answer: "The &lt;title&gt; defines the title of the HTML document, which appears in the browser's title bar or tab. It's placed within the &lt;head&gt; section."},
    { question: "What is the purpose of the &lt;meta&gt; tag?", answer: "The &lt;meta&gt; tag provides metadata about the HTML document, such as character set, author, description, and keywords. It's placed within the &lt;head&gt; section."},
    { question: "How do you create a table in HTML?", answer: "A table is created using the &lt;table&gt; tag, with rows defined by &lt;tr&gt; and cells by &lt;td&gt;. Headers can be defined using &lt;th&gt;."},
    { question: "How do you create a dropdown list in HTML?", answer: "A dropdown list is created using the &lt;select&gt; tag, with each option defined by an &lt;option&gt; tag."},
    { question: "What is the &lt;fieldset&gt; tag used for in HTML forms?", answer: "The &lt;fieldset&gt; tag is used to group related elements within a form, and the &lt;legend&gt; tag can provide a caption for the group."},
    { question: "What is the purpose of the rel attribute in a &lt;link&gt; tag?", answer: "The rel attribute specifies the relationship between the current document and the linked resource. For example, rel=”stylesheet” indicates that the linked file is a CSS stylesheet."}
];

let viewedQuestions = JSON.parse(localStorage.getItem('viewedQuestions')) || [];

function saveViewedQuestions(questionIndex) {
    if (!viewedQuestions.includes(questionIndex)) {
        viewedQuestions.push(questionIndex);
        localStorage.setItem('viewedQuestions', JSON.stringify(viewedQuestions));
        updateProgressBar();
    }
}

function resetProgress() {
    localStorage.removeItem('viewedQuestions');
    viewedQuestions = [];
    questions.forEach((item, index) => {
        const completed = document.getElementById(`completed-${index}`);
        if(completed) {
            completed.style.display = 'none';
        }
        const answer = document.getElementById(`answer-${index}`);
        if(answer) {
            answer.style.display = 'none';
        }

    });
    updateProgressBar();
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progress = (viewedQuestions.length / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}

const questionsDiv = document.getElementById('questions');

questions.map((item, index) => {
    const row = document.createElement('div');
    row.className = 'row centered-row mb-4';

    const card = document.createElement('div');
    card.className = 'col-md-8';

    card.innerHTML = `
        <div class="card">
            <div class="card-header" data-index="${index}">
                ${item.question}
                <span id="completed-${index}" class="float-right" style="display: none;">&#10004;</span>
            </div>
            <div class="card-body" id="answer-${index}" style="display: none;">
                <p class="text-primary">${item.answer}</p>
            </div>
        </div>
    `;

    row.appendChild(card);
    questionsDiv.appendChild(row);
});

questions.forEach((item, index) => {
    const header = document.querySelector(`.card-header[data-index="${index}"]`);
    const answer = document.getElementById(`answer-${index}`);
    const completed = document.getElementById(`completed-${index}`);

    if (viewedQuestions.includes(index)) {
        completed.style.display = 'inline';
    }

    header.addEventListener('click', () => {
        // Collapse all other answers
        questions.forEach((otherItem, otherIndex) => {
            if (otherIndex !== index) {
                const otherAnswer = document.getElementById(`answer-${otherIndex}`);
                if (otherAnswer) {
                    otherAnswer.style.display = 'none';
                }
            }
        });

        // Toggle the current answer
        answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        saveViewedQuestions(index);
        completed.style.display = 'inline';
    });
});

document.getElementById('resetButton').addEventListener('click', resetProgress);
updateProgressBar();