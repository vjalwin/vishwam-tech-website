// Job data structure
const jobData = {
    fullstack: {
        title: "Senior Full Stack Developer",
        requirements: [
            "5+ years of professional software development experience",
            "Strong expertise in React.js and modern JavaScript/TypeScript",
            "Proficiency in Node.js and backend development",
            "Excellent problem-solving and communication skills"
        ],
        description: [
            "As a Senior Full Stack Developer at Vishwam Tech Solutions, you will be responsible for architecting and developing enterprise-grade applications for our clients in the energy, utilities, and infrastructure sectors. You will work closely with cross-functional teams to understand business requirements, design scalable solutions, and implement best practices throughout the development lifecycle.",
            "This role offers the opportunity to work on challenging projects using cutting-edge technologies while mentoring junior developers and contributing to our technical roadmap. You'll have direct client interaction and play a key role in shaping the technical direction of our projects."
        ],
        education: "Bachelor's or Master's degree in Computer Science, Engineering, or related field",
        jobRequirements: [
            "Full-stack development experience with React, Node.js, and related technologies",
            "Experience with RESTful API design and implementation",
            "Knowledge of database design (SQL and NoSQL)",
            "Experience with Azure cloud platform and services",
            "Understanding of CI/CD pipelines and DevOps practices",
            "Strong understanding of software design patterns and principles",
            "Experience working in Agile/Scrum environments"
        ],
        skills: [
            "React.js, JavaScript/TypeScript, HTML5, CSS3",
            "Node.js, Express.js, RESTful APIs",
            "Azure (App Services, Functions, Data Factory)",
            "SQL Server, MongoDB or similar databases",
            "Git, Azure DevOps or similar version control",
            "Unit testing and test automation frameworks",
            "Strong analytical and problem-solving abilities",
            "Excellent written and verbal communication"
        ]
    },
    springboot: {
        title: "Senior J2EE/Spring Boot Developer",
        requirements: [
            "5+ years of experience in Java/J2EE development",
            "Strong expertise in Spring Boot and Spring Framework",
            "Experience with microservices architecture",
            "Proficiency in database design and optimization",
            "Strong understanding of RESTful web services"
        ],
        description: [
            "As a Senior J2EE/Spring Boot Developer at Vishwam Tech Solutions, you will design and develop robust, scalable backend systems for enterprise clients across various industries. You will be responsible for implementing microservices architectures, optimizing application performance, and ensuring code quality through best practices and thorough testing.",
            "This role requires someone who can work independently while collaborating with frontend developers, DevOps teams, and business stakeholders. You'll have the opportunity to influence technical decisions and contribute to the architectural evolution of our platform."
        ],
        education: "Bachelor's or Master's degree in Computer Science, Engineering, or related field",
        jobRequirements: [
            "Extensive experience with Java, J2EE, and Spring Boot framework",
            "Strong knowledge of Spring ecosystem (Spring Security, Spring Data, etc.)",
            "Experience with microservices design patterns",
            "Proficiency in SQL and NoSQL databases",
            "Understanding of containerization (Docker, Kubernetes)",
            "Experience with message queuing systems (Kafka, RabbitMQ)",
            "Knowledge of cloud platforms (Azure, AWS, or GCP)"
        ],
        skills: [
            "Java 8+, J2EE, Spring Boot, Spring Framework",
            "Hibernate/JPA, SQL Server, PostgreSQL, MongoDB",
            "RESTful API design and implementation",
            "Maven/Gradle, Git, Jenkins/Azure DevOps",
            "JUnit, Mockito, integration testing",
            "Docker, Kubernetes (preferred)",
            "Strong debugging and optimization skills",
            "Excellent communication and teamwork abilities"
        ]
    }
};

// Get job type from URL parameter
function getJobType() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('job') || 'fullstack';
}

// Populate job details on page load
document.addEventListener('DOMContentLoaded', function () {
    const jobType = getJobType();
    const job = jobData[jobType];

    if (!job) {
        console.error('Job not found');
        return;
    }

    // Update page title
    document.title = `${job.title} - Vishwam Tech Solutions`;

    // Update job title
    document.querySelector('.job-title').textContent = job.title;

    // Update requirements
    const requirementsList = document.querySelector('.requirements-list');
    requirementsList.innerHTML = job.requirements.map(req => `<li>${req}</li>`).join('');

    // Update description
    const descriptionContainer = document.querySelector('.description-container');
    descriptionContainer.style.textAlign = 'justify';
    descriptionContainer.innerHTML = job.description.map(para => `<p>${para}</p>`).join('');


    // Update education
    document.querySelector('.education-text').textContent = job.education;

    // Update job requirements
    const jobReqList = document.querySelector('.job-requirements-list');
    jobReqList.innerHTML = job.jobRequirements.map(req => `<li>${req}</li>`).join('');

    // Update skills
    const skillsList = document.querySelector('.skills-list');
    skillsList.innerHTML = job.skills.map(skill => `<li>${skill}</li>`).join('');

    // Update form with job title
    const form = document.getElementById('application-form');
    if (form) {
        form.dataset.position = job.title;
    }
});

// Display selected file name
function displayFileName(input) {
    const fileNameDisplay = input.parentElement.querySelector('.file-name');
    if (input.files.length > 0) {
        const file = input.files[0];
        const fileSize = (file.size / (1024 * 1024)).toFixed(2);

        if (file.size > 5 * 1024 * 1024) {
            fileNameDisplay.textContent = 'File too large. Maximum size is 5MB.';
            fileNameDisplay.style.color = '#e74c3c';
            input.value = '';
        } else {
            fileNameDisplay.textContent = `${file.name} (${fileSize} MB)`;
            fileNameDisplay.style.color = '#28a745';
        }
    }
}

// GetForm.io - FREE with file uploads (100 submissions/month)


async function submitApplication(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const successMsg = form.querySelector('.success-message');
    const position = form.dataset.position;

    // Validation
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');

    inputs.forEach(input => {
        const errorMsg = input.parentElement.querySelector('.error-message');
        if (!input.value.trim()) {
            input.classList.add('error');
            if (errorMsg) errorMsg.classList.add('show');
            isValid = false;
        } else {
            input.classList.remove('error');
            if (errorMsg) errorMsg.classList.remove('show');
        }
    });

    const emailInput = form.querySelector('input[type="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput.value)) {
        emailInput.classList.add('error');
        const errorMsg = emailInput.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.classList.add('show');
        isValid = false;
    }

    if (!isValid) return;

    // Add position
    formData.append('position', position);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
        // Replace YOUR_FORM_ENDPOINT with your GetForm endpoint
        const response = await fetch('https://getform.io/f/agdjzmmb', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            successMsg.classList.add('show');
            successMsg.textContent = 'Thank you for your application! Our team will review it and reach out soon.';
            submitBtn.textContent = 'Application Sent!';
            form.reset();

            const fileNameDisplay = document.querySelector('.file-name');
            if (fileNameDisplay) fileNameDisplay.textContent = '';

            setTimeout(() => {
                successMsg.classList.remove('show');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Apply Now';
            }, 5000);
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting. Please email info@vishwam.co directly.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Apply Now';
    }
}