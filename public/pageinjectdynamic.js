function autoFill(applicant){
    console.log(window);
    console.log("Autofilling applicant "+applicant.firstName);
    var firstname = document.getElementById("hcmapplicantlistpage_1_PersonName_FirstName_input");       
    window.$dyn.setValue(firstname.dynContext.current, "Value", applicant.firstName, true);

    var jobTitle = document.getElementById("hcmapplicantlistpage_1_HcmApplicant_CurrentJobTitle_input");
    window.$dyn.setValue(jobTitle.dynContext.current, "Value", applicant.jobTitle, true);
}

document.addEventListener('autofillapplicant', function (e) {
    var applicant = e.detail;
    console.log('received', applicant);
    autoFill(applicant);
  });


