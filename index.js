"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// Event listener for the "Generate Resume" button
document.querySelector(".btn")?.addEventListener("click", (e) => {
    let form = document.querySelector("#resume_form");
    if (form && form.checkValidity()) {
        e.preventDefault();
        // Select necessary HTML elements
        let profile = document.querySelector("#profile_picture");
        let name = document.querySelector("#name");
        let email = document.querySelector("#email");
        let phone = document.querySelector("#phone");
        let address = document.querySelector("#address");
        let school = document.querySelector("#school");
        let degree = document.querySelector("#degree");
        let additionalInfo = document.querySelector("#additional_Info");
        let skills = document.querySelector("#skills_list");
        let job = document.querySelector("#job");
        let date = document.querySelector("#date");
        let description = document.querySelector("#description");
        // profile elements
        let profilepictureFile = profile.files?.[0];
        let profilepictureURL = profilepictureFile
            ? URL.createObjectURL(profilepictureFile)
            : "";
        // Check if all fields have values
        if (profile &&
            name &&
            email &&
            phone &&
            address &&
            school &&
            degree &&
            additionalInfo &&
            skills &&
            job &&
            date &&
            description) {
            let resumeOutput = `
        ${profilepictureURL
                ? `<img src="${profilepictureURL}" alt="profile picture" class="profile_picture">`
                : ""}
        <h2>Personal information</h2>
        <p><strong>Name:</strong> ${name.value}</p>
        <p><strong>Email:</strong> ${email.value}</p>
        <p><strong>Phone:</strong> ${phone.value}</p>
        <p><strong>Address:</strong> ${address.value}</p>
        <hr />
        <h2>Education</h2>
        <p><strong>School:</strong> ${school.value}</p>
        <p><strong>Degree:</strong> ${degree.value}</p>
        <p><strong>Additional Information:</strong> ${additionalInfo.value}</p>
        <hr />
        <h2>Skills</h2>
        <p> ${skills.value}</p>
        <hr />
        <h2>Experience</h2>
        <p><strong>Job Title:</strong> ${job.value}</p>
        <p><strong>Date:</strong> ${date.value}</p>
        <p><strong>Description:</strong> ${description.value}</p>
    `;
            let finalResume = document.querySelector("#resume_generated");
            if (finalResume) {
                finalResume.innerHTML = resumeOutput;
                finalResume.style.display = "block"; // Show the resume
                finalResume.classList.remove("hidden");
                // Create a container for the button
                let buttonContainer = document.createElement("div");
                buttonContainer.id = "button_container";
                // Create PDF download button
                let downloadPDFButton = document.createElement("button");
                downloadPDFButton.textContent = "Download your resume as PDF";
                downloadPDFButton.addEventListener("click", () => {
                    window.print();
                });
                // Append button to the container
                buttonContainer.appendChild(downloadPDFButton);
                // Append the container to the final resume
                finalResume.appendChild(buttonContainer);
            }
            else {
                console.error("Resume output container not found");
            }
        }
        else {
            console.error("Form elements are missing");
        }
    }
});
