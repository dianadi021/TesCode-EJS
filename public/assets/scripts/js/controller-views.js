/** @format */
$(document).ready(() => {
  const serverURL = `http://${window.location.host}/assets`;
  // const serverURL = 'https://dianadi021.github.io/public/assets';

  $.getScript(serverURL + '/scripts/js/personal-function.js', () => {
    DisableRightClickOnMouse();
    FormValidationForProduk();
    showOverlayFormInputProduk();
    hideOverlayFormInputProduk();
    deleteDocumentAlert();
    GetIDNMoneyCurrency();
  });

  $.getScript(serverURL + '/views/home.js', async () => {
    // await CommunityDisplay(serverURL);
    // await ProjectsDisplay(serverURL);
  });
});
