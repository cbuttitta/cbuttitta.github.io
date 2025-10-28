document.getElementById("show-html").addEventListener("click", () => {
  const form = document.getElementById("form");
  const formData = new FormData(form);


  const data = {
    firstName: formData.get("firstName") || "",
    middleName: formData.get("middleName") || "",
    nickname: formData.get("nickname") || "",
    lastName: formData.get("lastName") || "",
    mascotAdj: formData.get("mascotAdj") || "",
    mascotAnimal: formData.get("mascotAnimal") || "",
    pictureSrc: "images/case.jpg", 
    pictureCaption: formData.get("pictureCaption") || "",
    personalBackground: formData.get("personalBackground") || "",
    professionalBackground: formData.get("professionalBackground") || "",
    academicBackground: formData.get("academicBackground") || "",
    primaryComputer: formData.get("primaryComputer") || "",
    funnyThing: formData.get("funnyThing") || "",
    quote: formData.get("quote") || "",
    quoteAuthor: formData.get("quoteAuthor") || ""
  };
  const courseInputs = Array.from(document.querySelectorAll("#course-container input"));
  let courseListItems = "";
  for (let i = 0; i < courseInputs.length; i += 3) {
    const deptNum = courseInputs[i].value.trim();
    const courseName = courseInputs[i + 1]?.value.trim();
    const reason = courseInputs[i + 2]?.value.trim();

    if (deptNum && courseName && reason) {
      courseListItems += `
        <li><b>${deptNum} - ${courseName}:</b> <span>${reason}</span></li>
      `;
    }
  }

  const htmlTemplate = `
    <h2 style="text-align: center;">${data.firstName} ${data.middleName} ${data.nickname} ${data.lastName} | ${data.mascotAdj} ${data.mascotAnimal}</h2>
    <figure id="intro-figure">
        <img src="${data.pictureSrc}" alt="${data.firstName} ${data.lastName}">
        <figcaption id="intro-caption">${data.pictureCaption}</figcaption>
    </figure>
    <section>
        <h3>Personal Information:</h3>
        <p><b>Personal Background: </b>${data.personalBackground}</p>
        <p><b>Professional Background: </b>${data.professionalBackground}</p>
        <p><b>Academic Background: </b>${data.academicBackground}</p>
        <p><b>Primary Computer: </b>${data.primaryComputer}</p>
        <p><b>Courses I'm Taking and Why: </b></p>
        <ol>${courseListItems}</ol>
        <p><b>Interesting Thing to Remember Me By: </b>${data.funnyThing}</p>
    </section>
    <section>
        <p>${data.quote}</p>
        <em>- ${data.quoteAuthor}</em>
    </section>
  `;
  const escapeHtml = (str) =>
    str.replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
  const container = document.createElement("div");

container.innerHTML = `<pre><code class="language-html">${escapeHtml(htmlTemplate)}</code></pre>`;
form.replaceWith(container);


const code = container.querySelector("code");
hljs.highlightElement(code);
});
