function Add() {
  return (
    <>
      <section
        className="container mt-5 add_con"
        style={{
            marginTop:"80px",
          background:
            "url('https://hamart-shop.vercel.app/_next/static/media/banner-1.a1774ed4.jpg')",
         
          
        }}
      >
        <div class="row">
          <div class="col-xl-5 col-lg-6 col-md-8">
            <div class="banner__content">
              <span>Apple iPhone 14 Pro Max</span>
              <h3 class="banner__title">
                <a href="/shop">The wait is on: iPhone 14 max pro</a>
              </h3>
              <p>
                Last call for up to <span>32%</span> off!{" "}
              </p>
              <div class="banner__btn">
                <a class="tp-btn" href="/shop">
                  Buy Now
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.999969 7H13"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M6.99997 1L13 7L6.99997 13"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Add;
