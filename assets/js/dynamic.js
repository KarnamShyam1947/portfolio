
const getContainer = (details) => {
    let div = document.createElement('div');  // Create the div element programmatically
    div.classList.add('mh-education-item', 'dark-bg', 'wow', 'fadeInUp');
    div.setAttribute('data-wow-duration', '0.8s');
    div.setAttribute('data-wow-delay', '0.3s');

    // Creating the content inside the div
    div.innerHTML = `
        <h4>${details.course}<a href="#">${details.institute}</a></h4>
        <div class="mh-eduyear">${details.duration}</div>
        <p>${details.description}</p>
    `;
    return div;
}

const getCertificateContainer = (details) => {
    let div = document.createElement('div');  // Create the div element programmatically
    div.classList.add('mh-work-item', 'dark-bg', 'wow', 'fadeInUp');
    div.setAttribute('data-wow-duration', '0.8s');
    div.setAttribute('data-wow-delay', '0.7s');

    let ul = document.createElement("ul");
    ul.classList.add("work-responsibility");
    for(let i = 0; i < details.skills.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `
            <i class="fa fa-circle"></i>${details.skills[i]}
        `;

        ul.appendChild(li);
    }
    let li = document.createElement("li");
    li.innerHTML = `
        <i class="fa fa-circle"></i>
        <a href="${details.certificateLink}">Certificate Link</a>
    `;
    ul.appendChild(li);


    // Creating the content inside the div
    div.innerHTML = `
        <h4>${details.title} From <a href="#">${details.issuer}</a></h4>
        <div class="mh-eduyear">${details.duration}</div>
        <span>Skills :</span>
    `;
    div.appendChild(ul);

    return div;
}

const getPublicationContainer = (details) => {
    let div = document.createElement('div');  // Create the div element programmatically
    div.classList.add('mh-work-item', 'dark-bg', 'wow', 'fadeInUp');
    div.setAttribute('data-wow-duration', '0.8s');
    div.setAttribute('data-wow-delay', '0.3s');

    // Use a helper function to safely escape HTML
    const escapeHTML = (str) => {
        return str.replace(/[&<>"']/g, (match) => {
            const escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;',
            };
            return escapeMap[match];
        });
    };

    // Default text if missing
    const githubText = details.githubLink ? `<a href="${escapeHTML(details.githubLink)}">Github Link</a>` : 'Github Link not available';
    const paperText = details.paperLink 
        ? `<a href="${escapeHTML(details.paperLink)}">${details.paperLink === "" ? 'Ongoing' : 'Publication Link'}</a>` 
        : 'Ongoing';

    div.innerHTML = `
    <h4>${escapeHTML(details.title || 'Untitled')}</h4>
    <div class="mh-eduyear">${escapeHTML(details.duration || 'No duration available')}</div>

    <ul class="work-responsibility">
        <li><i class="fa fa-circle"></i> ${escapeHTML(details.description || 'No description available')}</li>
        <li><i class="fa fa-circle"></i>
            ${githubText} | ${paperText}
        </li>
    </ul>
    `;

    return div;
};

const addContainer = (data) => {
    let educationDetails = document.getElementById("education-details");

    // Loop through the data array
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let container = getContainer(element);

        // Insert the container element into the educationDetails section
        educationDetails.insertAdjacentElement("afterbegin", container);
    }
}

const addCertificateDetails = (data) => {
    let educationDetails = document.getElementById("certificate-details");

    // Loop through the data array
    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        let container = getCertificateContainer(element);

        // Insert the container element into the educationDetails section
        educationDetails.insertAdjacentElement("afterbegin", container);
    }
}

const addSkillsDetails = (data) => {
    let languageSkills = document.getElementById("language-skills");
    let frameworkSkills = document.getElementById("framework-skills");
    let othersSkills = document.getElementById("others-skills");
    let toolsSkills = document.getElementById("tools-skills");

    for(let i = 0; i < data.Languages.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `
            <i class="fa-solid fa-angles-right text-clr"></i> &nbsp; ${data.Languages[i]}
        `;

        languageSkills.appendChild(li);
    }

    for(let i = 0; i < data.frameworks.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `
            <i class="fa-solid fa-angles-right text-clr"></i> &nbsp; ${data.frameworks[i]}
        `;

        frameworkSkills.appendChild(li);
    }

    for(let i = 0; i < data.Tools.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `
            <i class="fa-solid fa-angles-right text-clr"></i> &nbsp; ${data.Tools[i]}
        `;

        toolsSkills.appendChild(li);
    }

    for(let i = 0; i < data.Others.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `
            <i class="fa-solid fa-angles-right text-clr"></i> &nbsp; ${data.Others[i]}
        `;

        othersSkills.appendChild(li);
    }

}

const addPublicaionDetails = (data) => {
    let publicationContainer = document.getElementById("publication-container");

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        let container = getPublicationContainer(element);

        // Insert the container element into the educationDetails section
        publicationContainer.insertAdjacentElement("afterbegin", container);
    }

}

const createPortfolioItem = (data, id) => {
    // Create the portfolio grid item
    const div = document.createElement('div');
    div.classList.add('grid-item', 'col-md-4', 'col-sm-6', 'col-xs-12');
    data.cssClass.forEach(className => {
        div.classList.add(className);
    });
    

    div.innerHTML = `
        <figure>
            <img src="${data.photoUrl}" alt="img04">
            <figcaption class="fig-caption">
                <i class="fa fa-search"></i>
                <h5 class="title">${data.title}</h5>
                <span class="sub-title">${data.subTitle}</span>
                <a data-fancybox data-src="#project-${id}"></a>
            </figcaption>
        </figure>
    `;
    return div;
};

const createPortfolioModal = (data, id) => {
    const mhPortfolioModal = document.createElement("div");
    mhPortfolioModal.classList.add("mh-portfolio-modal");
    mhPortfolioModal.setAttribute("id", `project-${id}`);
    
    const mhPortfolioModalInner = document.createElement("div");
    mhPortfolioModalInner.classList.add("mh-portfolio-modal-inner", "row");

    const container = document.createElement("div");
    container.classList.add("container");

    const modalDescription = document.createElement("div");
    modalDescription.classList.add("col-sm-5");

    const modalPhotosOuter = document.createElement("div");
    modalPhotosOuter.classList.add("col-sm-7");

    modalDescription.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.moreInfo.description}</p>
        <div class="mh-about-tag">
            <ul>
                ${data.moreInfo.skills.map(skill => `<li><span>${skill}</span></li>`).join('')}
            </ul>
        </div>
        <a href="${data.liveDemo}" class="btn btn-fill">Live Demo</a>
    `;

    const modalPhotos = document.createElement("div");
    modalPhotos.classList.add("mh-portfolio-modal-img")
    modalPhotos.innerHTML = data.moreInfo.photos.map(photo => `
        <div>
            <img src="${photo.imageUrl}" alt="" class="img-fluid">
            <p>${photo.imageSubTitle}</p>
        </div>
    `).join('');

    modalPhotosOuter.appendChild(modalPhotos);
    
    mhPortfolioModalInner.appendChild(modalDescription);
    mhPortfolioModalInner.appendChild(modalPhotosOuter);

    container.appendChild(mhPortfolioModalInner);

    mhPortfolioModal.appendChild(container);

    return mhPortfolioModal;
};

const addProjectDetails = (data) => {
    // console.log("debuged.............")
    let publicationContainer = document.getElementById("projectContainer");
    let projectModel = document.getElementById("project-models");

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        let container = createPortfolioItem(element, (i+1));
        let modelContainer = createPortfolioModal(element, (i+1));

        // Insert the container element into the educationDetails section
        projectModel.appendChild(modelContainer);
        publicationContainer.appendChild(container);
    }

}

const fetchPromises = [
    fetch("data/education.json")
      .then(r => r.json())
      .then(data => addContainer(data))
      .catch(e => console.log(e)),
  
    fetch("data/certificate.json")
      .then(r => r.json())
      .then(data => addCertificateDetails(data))
      .catch(e => console.log(e)),
  
    fetch("data/publications.json")
      .then(r => r.json())
      .then(data => addPublicaionDetails(data))
      .catch(e => console.log(e)),
  
    fetch("data/skills.json")
      .then(r => r.json())
      .then(data => addSkillsDetails(data))
      .catch(e => console.log(e)),
  
    fetch("data/projects.json")
      .then(r => r.json())
      .then(data => addProjectDetails(data))
      .catch(e => console.log(e)),
  ];
  
  // Use Promise.all to wait for all promises to resolve
  Promise.all(fetchPromises)
    .then(() => {
        var $container = $('.portfolioContainer');
        $container.isotope({
            filter: '*',
            animationOptions: {
                queue: true
            }
        });
     
        $('.portfolio-nav li').click(function(){
            $('.portfolio-nav .current').removeClass('current');
            $(this).addClass('current');
     
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    queue: true
                }
             });
             return false;
        });

        const afterLoad = () => {
            $("#clickMe").click();
            console.log("Called");
        }
        // window.onload = () => {
            setTimeout(
                afterLoad,
                2000
            )

        // }
    })
    .catch(e => console.log("Error loading some data:", e));
  