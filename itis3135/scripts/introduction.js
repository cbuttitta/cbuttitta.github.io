document.addEventListener("DOMContentLoaded", function () {
    //set date to today
    document.getElementById("ackDate").valueAsDate = new Date();

    //clear button
    document.getElementById("clear").addEventListener("click", function () {
        const form = document.getElementById("form");

        // Loop through all input elements in the form
        form.querySelectorAll("input").forEach(input => {
            if (input.type === "file") {
                input.value = null; // reset file input
            }
            else {
                input.value = "";
            }
        });

        // Optionally clear textareas too
        form.querySelectorAll("textarea").forEach(textarea => {
            textarea.value = "";
        });
    });


    const form = document.getElementById('form');

    //no submit without required info
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let valid = true;
        const fields = this.querySelectorAll("input, textarea, select");
        fields.forEach(field => {
            // Skip optional fields if they have the attribute `optional`
            const isOptional = field.dataset.optional === "true";
            if (!isOptional && field.type !== "file") {
                if (field.value.trim() === "") {
                    valid = false;
                    field.style.border = "2px solid red";
                } else {
                    field.style.border = "1px solid #ccc";
                }
            }
        });
        if (!valid) {
            alert("Please fill out all required fields before submitting.");
        }
        const formData = new FormData(form);
        const firstName = formData.get("firstName");
        const middleName = formData.get("middleName") || "";
        const nickname = formData.get("nickname") || "";
        const lastName = formData.get("lastName");
        const mascotAdj = formData.get("mascotAdj");
        const mascotAnimal = formData.get("mascotAnimal");
        const pictureSrc = form.querySelector('input[name="picture"]').files[0]
            ? URL.createObjectURL(form.querySelector('input[name="picture"]').files[0])
            : "images/case.jpg";
        const pictureCaption = formData.get("pictureCaption");
        const personalBackground = formData.get("personalBackground");
        const professionalBackground = formData.get("professionalBackground");
        const academicBackground = formData.get("academicBackground");
        const primaryComputer = formData.get("primaryComputer");
        const quote = formData.get("quote");
        const quoteAuthor = formData.get("quoteAuthor");
        const funnyThing = formData.get("funnyThing");
        const courseContainer = document.getElementById("course-container");
        const courseListItems = Array.from(courseContainer.querySelectorAll("label")).map(label => {
            const inputs = label.querySelectorAll("input");
            if (inputs.length === 3) {
                const dept = inputs[0].value;
                const name = inputs[1].value;
                const reason = inputs[2].value;
                return `<li><b>${dept} - ${name}:</b> <span>${reason}</span></li>`;
            }
            return '';
        }).join("");
        const summaryHTML = `
    <h2 style="text-align: center;">${firstName} ${middleName} ${nickname} ${lastName} | ${mascotAdj} ${mascotAnimal}</h2>
    <figure id="intro-figure">
        <img src="${pictureSrc}" alt="${firstName} ${lastName}">
        <figcaption id="intro-caption">${pictureCaption}</figcaption>
    </figure>
    <section>
        <h3>Personal Information:</h3>
        <p><b>Personal Background: </b>${personalBackground}</p>
        <p><b>Professional Background: </b>${professionalBackground}</p>
        <p><b>Academic Background: </b>${academicBackground}</p>
        <p><b>Primary Computer: </b>${primaryComputer}</p>
        <p><b>Courses I'm Taking and Why: </b></p>
        <ol>${courseListItems}</ol>
        <p><b>Interesting Thing to Remember Me By: </b>${funnyThing}</p>
    </section>
    <section>
        <p>${quote}</p>
        <em>- ${quoteAuthor}</em>
    </section>
`;
        form.replaceWith(document.createRange().createContextualFragment(summaryHTML));




    });

    //reset logic
    document.getElementById('reset').addEventListener('click', function (event) {
        const fields = form.querySelectorAll("input, textarea, select");
        fields.forEach(field => {
            field.style.border = "1px solid #ccc";
        });

    });

    function createCourseBox() {
        const container = document.getElementById("course-container");
        const courseCount = container.querySelectorAll("label").length + 1;

        const courseLabel = document.createElement("label");
        courseLabel.innerHTML = `
            Course ${courseCount}:
            <input type="text" placeholder="Department and number (e.g., ITSC####)"> -
            <input type="text" placeholder="Course Name"> -
            <input type="text" placeholder="Reason for taking course">
        `;

        // Add delete button beside each course
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            container.removeChild(courseLabel);
        });
        courseLabel.appendChild(deleteButton);

        container.appendChild(courseLabel);
    }
});

