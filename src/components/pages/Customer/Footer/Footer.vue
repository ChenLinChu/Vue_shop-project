<template>
  <fragment>
    <div style="clear: both;"></div>
    <footer>
      <div class="footerContainer">
        <div class="about">
          <h6>ABOUT US</h6>
          <p>Stærk Store is a retail footprint founded by Trinity Chain. Over the course of several years, we established as a premiere destination for quintessential streetwear and sneakers and expanded into several growing markets across China and Southeast Asia, a destination for the most exciting brands in the space.</p>
        </div>
        <div class="useful">
          <h6>USEFUL INFORMATION</h6>
          <ul>
            <li>SHIPPING</li>
            <li>PAYMENT</li>
            <li>RETURNS & REFUNDS</li>
            <li>PRIVACY POLICY</li>
            <li>TERMS & CONDITIONS</li>
          </ul>
        </div>
        <div class="customer">
          <h6>CUSTOMER SERVICE</h6>
          <a href="mailto:chenlinchu637@gmai1.com">CONTACT US VIA EMAIL</a>
        </div>
        <div style="clear: both"></div>
        <div class="right">
          <p>Copyright © 2020 ChenLin Chu All rights reserved.</p>
          <div class="creditCards">
            <img
              src="//cdn.shopify.com/s/assets/payment_icons/master-173035bc8124581983d4efa50cf8626e8553c2b311353fbf67485f9c1a2b88d1.svg"
              height="25"
              alt="master"
            />
            <img
              src="//cdn.shopify.com/s/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg"
              height="25"
              alt="visa"
            />
            <img
              src="//cdn.shopify.com/s/assets/payment_icons/american_express-2264c9b8b57b23b0b0831827e90cd7bcda2836adc42a912ebedf545dead35b20.svg"
              height="25"
              alt="american express"
            />
            <img
              src="//cdn.shopify.com/s/assets/payment_icons/alipay-e2b5ac81b49d42a7bfc880600f5dd1e8d9afccd16740cdf728b45dca80265d40.svg"
              height="25"
              alt="alipay"
            />
          </div>
        </div>
      </div>
    </footer>
  </fragment>
</template>

<style lang="scss" scoped>
@import "../../../../assets/variables.scss";

footer {
  margin-top: 50px;

  .footerContainer {
    background-color: #9e9e9e;
    width: 100%;
    padding: 3%;
    height: 350px;

    .about,
    .useful,
    .customer {
      margin: 0 1%;
      width: 31.3333333%;
      float: left;

      h6 {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
      }
    }

    .about {
      p {
        font-size: 12px;
        width: 80%;
      }
    }

    .useful {
      ul {
        list-style: none;

        li {
          margin-bottom: 5px;
          font-size: 12px;
        }
      }
    }

    .customer {
      a {
        text-decoration: none;
        color: black;
        font-size: 12px;

        &:hover {
          color: gray;
        }
      }
    }

    .right {
      margin: 0 1%;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: 12px;
      }
    }
  }

  @include pad() {
    .footerContainer {
      height: 450px;

      .about,
      .useful,
      .customer {
        margin: 0 1%;
        width: 98%;
      }

      .about {
        p {
          width: 100%;
        }
      }

      .right {
        margin: 0 1%;
        margin-top: 20px;
        display: block;
      }
    }
  }

  @include mobile() {
    .footerContainer {
      height: 480px;
    }
  }
}
</style>