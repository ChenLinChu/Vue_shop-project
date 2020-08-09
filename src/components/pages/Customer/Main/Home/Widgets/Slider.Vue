<template>
  <div class="slider-container">
    <div class="slider">
      <div class="slide slide1">
        <div class="caption">
          <h2>Supreme New York</h2>
          <p>190 Bowery</p>
          <p>NYC 10012</p>
          <p>Tel 212-966-7799</p>
          <p>Open 11 - 7 (MON-SAT)</p>
          <p>12 - 6 (SUN)</p>
        </div>
      </div>
      <div class="slide slide2">
        <div class="caption">
          <h2>Supreme Brooklyn</h2>
          <p>152 Grand Street</p>
          <p>Brooklyn, NY</p>
          <p>Tel 718-599-2700</p>
          <p>Open 11 - 7 (MON-SAT)</p>
          <p>12 - 6 (SUN)</p>
        </div>
      </div>
      <div class="slide slide3">
        <div class="caption">
          <h2>Supreme San Francisco</h2>
          <p>1015 Market Street</p>
          <p>San Francisco, CA 94103</p>
          <p>Tel 415-991-2929</p>
          <p>Open 11 - 7 (MON-SAT)</p>
          <p>12 - 6 (SUN)</p>
        </div>
      </div>
      <div class="slide slide4">
        <div class="caption">
          <h2>Supreme Los Angeles</h2>
          <p>439 North Fairfax Ave</p>
          <p>LA 90036</p>
          <p>Tel 323-655-6205</p>
          <p>Open 11 - 7 (MON-SAT)</p>
          <p>12 - 6 (SUN)</p>
        </div>
      </div>
      <div class="slide slide5">
        <div class="caption">
          <h2>Supreme London</h2>
          <p>2/3 Peter Street</p>
          <p>London W1F 0AA</p>
          <p>Tel +44 207-437-0493</p>
          <p>Open 11 - 7 (MON-SAT)</p>
          <p>12 - 6 (SUN)</p>
        </div>
      </div>
      <div class="slide slide6">
        <div class="caption">
          <h2>Supreme Paris</h2>
          <p>20 Rue Barbette</p>
          <p>Paris 75003</p>
          <p>Tel +33 1 43 48 80 14</p>
          <p>Open 11 - 7 (MON-SAT)</p>
          <p>12 - 6 (SUN)</p>
        </div>
      </div>
      <div class="slide slide1">
        <div class="caption">
          <h2>Supreme New York</h2>
          <p>190 Bowery</p>
          <p>NYC 10012</p>
          <p>Tel 212-966-7799</p>
          <p>Open 11 - 7 (MON-SAT)</p>
          <p>12 - 6 (SUN)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../../../../../assets/variables.scss";

.slider-container {
  position: relative;
  width: 100vw;
  height: 70vh;
  overflow: hidden;

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 700%;
    height: 100%;
    animation: animate 40s infinite;

    .slide {
      position: relative;
      width: 14.2857143%;
      height: 100%;
      float: left;

      .caption {
        position: absolute;
        bottom: 60px;
        left: 60px;
        right: 60px;
        padding: 30px;
        background: rgba(0, 0, 0, 0.9);
        box-sizing: border-box;
        transition: 0.5s;

        h2 {
          margin: 0 0 20px;
          padding: 0;
          color: #fff;
          font-size: 48px;
          transition: 0.5s;
        }

        p {
          margin: 0;
          padding: 0;
          color: #fff;
          font-size: 18px;
          transition: 0.5s;
        }
      }

      &.slide1 {
        background-image: url("../../../../../../assets/pics/sliders/01_New York.jpg");
        background-size: cover;
        background-position: bottom;
      }

      &.slide2 {
        background-image: url("../../../../../../assets/pics/sliders/02_Brooklyn.jpg");
        background-size: cover;
        background-position: bottom;
      }

      &.slide3 {
        background-image: url("../../../../../../assets/pics/sliders/03_San Francisco.jpg");
        background-size: cover;
        background-position: bottom;
      }

      &.slide4 {
        background-image: url("../../../../../../assets/pics/sliders/04_Los Angeles.jpg");
        background-size: cover;
        background-position: bottom;
      }

      &.slide5 {
        background-image: url("../../../../../../assets/pics/sliders/05_London.jpg");
        background-size: cover;
        background-position: bottom;
      }

      &.slide6 {
        background-image: url("../../../../../../assets/pics/sliders/06_Paris.jpg");
        background-size: cover;
        background-position: bottom;
      }
    }
  }

  @keyframes animate {
    0% {
      left: 0;
    }
    14% {
      left: 0;
    }
    28% {
      left: -100%;
    }
    42% {
      left: -200%;
    }
    56% {
      left: -300%;
    }
    70% {
      left: -400%;
    }
    84% {
      left: -500%;
    }
    100% {
      left: -600%;
    }
  }

  @include pad() {
    .slider {
      .slide {
        .caption {
          bottom: 20px;
          left: 20px;
          right: 20px;
          padding: 30px;

          h2 {
            font-size: 28px;
          }

          p {
            font-size: 14px;
          }
        }
      }
    }
  }

  @include mobile() {
  }
}
</style>
