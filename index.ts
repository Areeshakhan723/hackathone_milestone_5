// Event listener for the "Generate Resume" button
document.querySelector(".btn")?.addEventListener("click", (e) => {
  let form = document.querySelector("#resume_form") as HTMLFormElement;

  if (form && form.checkValidity()) {
    e.preventDefault();

    // Select necessary HTML elements
    let profile = document.querySelector("#profile_picture") as HTMLInputElement;
    let name = document.querySelector("#name") as HTMLInputElement;
    let email = document.querySelector("#email") as HTMLInputElement;
    let phone = document.querySelector("#phone") as HTMLInputElement;
    let address = document.querySelector("#address") as HTMLInputElement;
    let school = document.querySelector("#school") as HTMLInputElement;
    let degree = document.querySelector("#degree") as HTMLInputElement;
    let additionalInfo = document.querySelector("#additional_Info") as HTMLInputElement;
    let skills = document.querySelector("#skills_list") as HTMLInputElement;
    let company = document.querySelector("#company") as HTMLInputElement;
    let job = document.querySelector("#job") as HTMLInputElement;
    let date = document.querySelector("#date") as HTMLInputElement;
    let description = document.querySelector("#description") as HTMLInputElement;
    let userURL = document.querySelector("#userURL") as HTMLInputElement;

    // unique path create
    let userElement = userURL.value;
    let uniquePath = `resume_${userElement.replace(/\s/g, '_')}_cv.html`;

    // profile elements
    let profilepictureFile  = profile.files?.[0];
    let profilepictureURL = profilepictureFile ? URL.createObjectURL(profilepictureFile) : '';

    // Check if all fields have values
    if (profile && name && email && phone && address && school && degree && additionalInfo && skills && company && job && date && description && userURL) {
      let resumeOutput = `
        ${profilepictureURL ? `<img src="${profilepictureURL}" alt="profile picture" class="profile_picture">` : ''}
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
        <p><strong>Company:</strong> ${company.value}</p>
        <p><strong>Job Title:</strong> ${job.value}</p>
        <p><strong>Date:</strong> ${date.value}</p>
        <p><strong>Description:</strong> ${description.value}</p>
    `;

      let finalResume = document.querySelector("#resume_generated") as HTMLElement;
      if (finalResume) {
        finalResume.innerHTML = resumeOutput;
        finalResume.style.display = "block"; // Show the resume after form submission
        finalResume.classList.remove("hidden")

        // create download link
        let downloadLink = document.createElement("a");
        downloadLink.href = "data:text/html;charset= UTF-8," + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = "Download your resume";

        let buttonContainer = document.createElement("div");
        buttonContainer.id = "button_container";
        buttonContainer.appendChild(downloadLink);

        // create PDF download button
        let downloadPDFButton = document.createElement("button");
        downloadPDFButton.textContent = "Download your resume as PDF";
        downloadPDFButton.addEventListener("click", () => {
          window.print();
        });
        buttonContainer.appendChild(downloadPDFButton);

        // create shareable link button
        let shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy shareable link";
        shareLinkButton.addEventListener("click", () => {
          try {
            let shareableLink = `https://yourdomain.vercel.app/resume/${userElement.replace(/\s+/g, "_")}_cv.html`;

            navigator.clipboard.writeText(shareableLink);
            alert("Shareable link has been copied to clipboard.");
          } catch (e) {
            alert("Failed to copy shareable link. Please try again.");
          }
        });
        buttonContainer.appendChild(shareLinkButton);

        finalResume.appendChild(buttonContainer);
      } else {
        console.error("Resume output container not found");
      }
    } else {
      console.error("Some fields are missing");
    }
  } else {
    console.error("Form elements are missing");
  }
});
