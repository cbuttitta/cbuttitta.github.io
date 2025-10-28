document.getElementById("show-json").addEventListener("click", () => {
  const form = document.getElementById("form");
  const formData = new FormData(form);


  const data = {
    firstName: formData.get("firstName") || "",
    preferredName: formData.get("nickname") || "",
    middleInitial: formData.get("middleName") || "",
    lastName: formData.get("lastName") || "",
    divider: formData.get("divider") || "",
    mascotAdjective: formData.get("mascotAdj") || "",
    mascotAnimal: formData.get("mascotAnimal") || "",
    image: "images/case.jpg", // could be replaced with uploaded image URL if you support uploads
    imageCaption: formData.get("pictureCaption") || "",
    personalStatement: formData.get("personalStatement") || "",
    personalBackground: formData.get("personalBackground") || "",
    professionalBackground: formData.get("professionalBackground") || "",
    academicBackground: formData.get("academicBackground") || "",
    subjectBackground: "", // not in your form, placeholder
    primaryComputer: formData.get("primaryComputer") || "",
    courses: [],
    links: []
  };


  const courseInputs = Array.from(document.querySelectorAll("#course-container input"));
  for (let i = 0; i < courseInputs.length; i += 3) {
    const deptNum = courseInputs[i]?.value.trim();
    const courseName = courseInputs[i + 1]?.value.trim();
    const reason = courseInputs[i + 2]?.value.trim();

    if (deptNum && courseName) {
      let department = "";
      let number = "";
      const match = deptNum.match(/^([A-Za-z]+)(\d+)$/);
      if (match) {
        department = match[1];
        number = match[2];
      } else {
        department = deptNum;
      }

      data.courses.push({
        department,
        number,
        name: courseName,
        reason
      });
    }
  }

  const linkInputs = form.querySelectorAll('input[type="url"]');
  const linkNames = ["LinkedIn", "GitHub", "GitHub Page", "freeCodeCamp", "Codecademy"];

  linkInputs.forEach((input, i) => {
    data.links.push({
      name: linkNames[i] || `Link ${i + 1}`,
      href: input.value
    });
  });

  const jsonString = JSON.stringify(data, null, 2);
  const jsonDisplay = document.createElement("pre");
  jsonDisplay.innerHTML = `<code>${jsonString}</code>`;

  form.replaceWith(jsonDisplay);
  jsonDisplay.after(backButton);
});
