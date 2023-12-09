/** @format */
const BannerSwiper = () => {
  const progressCircle = document.querySelector('.autoplay-progress svg');
  const progressContent = document.querySelector('.autoplay-progress span');
  const banner_swiper = new Swiper('#banner-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        progressCircle.style.setProperty('--progress', 1 - progress);
        progressContent.textContent = `${Math.ceil(time / 1000)}s`;
      },
    },
  });
};

const CertificateSwiper = () => {
  const certificate_swiper = new Swiper('#certificate-swiper', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
  });

  const certificate_swiper1 = new Swiper('#certificate-swiper1', {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: certificate_swiper,
    },
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
  });
};

let isHamburgerMenuOpen = false;
function TogglerMainMenuHamburger() {
  if (isHamburgerMenuOpen) {
    $('#main-menu').removeClass('active');
    $('#hamburger-menu').html("<i class='fa-solid fa-bars'></i>");
    isHamburgerMenuOpen = false;
  } else {
    $('#main-menu').attr('class', 'active');
    $('#hamburger-menu').html("<i class='fa-solid fa-xmark'></i>");
    isHamburgerMenuOpen = true;
  }
}

function DisableRightClickOnMouse() {
  function disableselect(e) {
    return false;
  }

  function reEnable() {
    return true;
  }

  document.onselectstart = new Function('return false');

  if (window.sidebar) {
    document.onmousedown = disableselect;
    document.onclick = reEnable;
  }
}

function FormValidationForProduk() {
  (() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        'submit',
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });
  })();
}

function showOverlayFormInputProduk(FormID, _IDDocument) {
  document.getElementById('overlay').style.display = 'flex';
  if (FormID) {
    document.getElementById(FormID).style.display = 'flex';
    if (_IDDocument) {
      if (FormID == 'form-edit-document-status') {
        document.getElementById(FormID).setAttribute('action', `http://localhost:9000/status/edit/${_IDDocument}`);
      } 
      if (FormID == 'form-edit-document-kategori') {
        document.getElementById(FormID).setAttribute('action', `http://localhost:9000/kategori/edit/${_IDDocument}`);
      } if() {
        document.getElementById(FormID).setAttribute('action', `http://localhost:9000/produk/edit/${_IDDocument}`);
      }
    }else{
      if (FormID == 'form-create-document-status') {
        document.getElementById(FormID).setAttribute('action', `http://localhost:9000/status/`);
      } else if (FormID == 'form-create-document-kategori') {
        document.getElementById(FormID).setAttribute('action', `http://localhost:9000/kategori/`);
      } else {
        document.getElementById(FormID).setAttribute('action', `http://localhost:9000/produk/`);
      }
    }
  }
}

function hideOverlayFormInputProduk(FormID) {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById(FormID).style.display = 'none';
}

function deleteDocumentAlert(FormID, _IDDocument) {
  const confirmDelete = prompt("Apakah anda mau menghapus document? ketik 'Lanjutkan'");
  if (confirmDelete == 'lanjutkan') {
    document.getElementById(FormID).setAttribute('method', `post`);
    if (FormID == 'form-delete-status') {
      document.getElementById(FormID).setAttribute('action', `http://localhost:9000/status/delete/${_IDDocument}`);
    } else if (FormID == 'form-delete-kategori') {
      document.getElementById(FormID).setAttribute('action', `http://localhost:9000/kategori/delete/${_IDDocument}`);
    } else {
      document.getElementById(FormID).setAttribute('action', `http://localhost:9000/produk/delete/${_IDDocument}`);
    }
    document.getElementById('btn-delete-document').addEventListener('click', FormID);
  } else if (typeof confirmDelete == 'string' && confirmDelete != 'lanjutkan') {
    alert('Inputan tidak sesuai! Silahkan coba lagi.');
  } else {
    alert('Penghapusan document telah dibatalkan.');
  }
}

const GetIDNMoneyCurrency = (Money) => {
  return Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Money);
};
