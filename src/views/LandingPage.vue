<template>
  <v-container dir="rtl" fluid class="pa-0 text-center white">
    <div class="grass-bg"></div>
    <v-layout
      justify-center
      align-center
      column
      class="px-3 hero"
      tag="section"
    >
      <h1
        :class="
          $vuetify.breakpoint.mdAndUp
            ? 'h1-lg font-weight-bold primary--text'
            : 'h1-sm font-weight-bold primary--text'
        "
      >
        ברוכים הבאים
        <br v-if="$vuetify.breakpoint.mdAndDown" />
        <span class="secondary--text">לועדה פתוחה</span>
      </h1>
      <h2 class="primary--text text-h6 text-md-h4 font-weight-regular">
        המקום שלך להשפיע על תהליכי תכנון ובניה בישוב, באזור ובמדינה
      </h2>
    </v-layout>
    <v-layout column class="green mx-15">
      <h4 class="white--text text-h5 text-md-h4 font-weight-bold my-3">
        רוצה לדעת מה בונים לידך?
      </h4>
      <v-text-field
        placeholder="הזן כתובת"
        rounded
        color="primary"
        background-color="white"
        :height="$vuetify.breakpoint.mdAndDown ? 41 : 60"
        :class="
          $vuetify.breakpoint.mdAndDown ? 'mb-0 p-relative' : 'mb-0 input-lg'
        "
      >
        <template v-slot:append v-if="$vuetify.breakpoint.mdAndUp">
          <v-btn
            rounded
            depressed
            color="primary"
            height="60px"
            class="p-absolute btn-lg"
          >
            רוצה לראות מה בונים לידי
          </v-btn>
        </template>
      </v-text-field>
      <v-btn
        v-if="$vuetify.breakpoint.mdAndDown"
        rounded
        x-small
        max-width="50%"
        class="primary white--text mx-auto mb-5 py-4"
      >
        רוצה לראות מה בונים לידי
      </v-btn>
    </v-layout>
    <v-container
      tag="section"
      :class="$vuetify.breakpoint.xl ? 'px-12 xlg-container' : ''"
    >
      <h4 class="text-h5 text-md-h4 font-weight-bold primary--text my-8">
        מה זאת ועדה
        <span class="secondary--text">פתוחה</span>
      </h4>
      <v-layout
        justify-space-between
        flex-column-reverse
        flex-md-row
        class="primary--text text-start"
      >
        <div class="me-md-15 px-10">
          <p class="">
            ועדה פתוחה היא פלטפורמה להשפעה על תהליכי התכנון והבנייה. המערכת,
            מנגישה את סדרי היום של ועדות התכנון ומאפשרת לכם - תושבות ותושבים
            פעילי סביבה, מתכננות, מתכננים, אדריכלים ואנשי מקצוע אחרים - להשתתף .
            באופן פעיל בתהליכי קבלת ההחלטות בתחום.
          </p>
          <p>
            ועדה פתוחה הוקמה על ידי חיים וסביבה, ארגון הגג של ארגוני הסביבה
            בישראל, והיא פועלת בשיתוף עם נציגי הארגונים הסביבתיים היושבים
            בוועדות התכנון על פי חוק הייצוג.
          </p>
          <p>
            ועדה פתוחה מיועדת להיות מרחב לדיון מכבד ומקדם פתרונות. הדברים
            שתפרסמו במערכת יגיעו לידי מקבלי ההחלטות ויוכלו להשפיע על עמדותיהם.
            לכן חשוב לנו לשמור על מרחב נקי מהתלהמות ומתוקפנות. לנציגי ונציגות
            הוועדות הזכות להגיב ולהתייחס לדברים שתכתבו, אבל הם אינם מחויבים לכך.
            ככל שהדברים יובאו בצורה מכבדת ומקצועית כך סיכוייהם, להשפיע יגדלו.
            זוהי אינה פלטפורמה להבעת מחאה אלא להשתתפות ולדיון. ונודה לכם אם
            תכבדו זאת.
          </p>
        </div>
        <div class="mb-10 mb-md-0 mx-auto">
          <iframe
            :width="$vuetify.breakpoint.mdAndDown ? 353 : 560"
            :height="$vuetify.breakpoint.mdAndDown ? 197 : 315"
            src="https://www.youtube.com/embed/iZ16dPLR3jo"
            frameborder="0"
          ></iframe>
        </div>
      </v-layout>
    </v-container>
    <v-container fluid class="p-relative of-hidden">
      <v-container
        tag="section"
        :class="
          $vuetify.breakpoint.xl
            ? 'mb-16 py-2 xlg-container'
            : 'mb-16 py-2 px-0'
        "
      >
        <h4 class="text-h5 text-md-h4 font-weight-bold primary--text my-8">
          מה היתרונות של ועדה
          <span class="secondary--text">פתוחה</span>
        </h4>
        <v-row :class="$vuetify.breakpoint.mdAndDown ? '' : 'mb-16'">
          <v-col cols="6" md="3">
            <v-card
              tile
              elevation="10"
              :class="
                $vuetify.breakpoint.mdAndDown
                  ? 'px-2 py-2 mb-6 card'
                  : 'px-5 py-8 mb-6 mx-5'
              "
            >
              <v-img
                class="mx-auto my-4"
                :height="$vuetify.breakpoint.mdAndDown ? '75px' : '65%'"
                :width="$vuetify.breakpoint.mdAndDown ? '75px' : '55%'"
                src="../assets/building-icon.svg"
                alt="icon"
              />
              <v-card-text>
                לורם איפסום דולור סיט אמט, קונסקטו אדיפיסינג אלית גולר מונפרר
                סוברט אלית גול
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" md="3">
            <v-card
              tile
              elevation="10"
              :class="
                $vuetify.breakpoint.mdAndDown
                  ? 'px-2 py-2 mb-6 card'
                  : 'px-5 py-8 mb-6 mx-5'
              "
            >
              <v-img
                class="mx-auto my-4"
                :height="$vuetify.breakpoint.mdAndDown ? '75px' : '65%'"
                :width="$vuetify.breakpoint.mdAndDown ? '75px' : '55%'"
                src="../assets/computer-icon.svg"
                alt="icon"
              />
              <v-card-text>
                לורם איפסום דולור סיט אמט, קונסקטו אדיפיסינג אלית גולר מונפרר
                סוברט אלית גול
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" md="3">
            <v-card
              tile
              elevation="10"
              :class="
                $vuetify.breakpoint.mdAndDown
                  ? 'px-2 py-2 mb-6 card'
                  : 'px-5 py-8 mb-6 mx-5'
              "
            >
              <v-img
                class="mx-auto my-4"
                :height="$vuetify.breakpoint.mdAndDown ? '75px' : '65%'"
                :width="$vuetify.breakpoint.mdAndDown ? '75px' : '55%'"
                src="../assets/people-icon.svg"
                alt="icon"
              />
              <v-card-text>
                לורם איפסום דולור סיט אמט, קונסקטו אדיפיסינג אלית גולר מונפרר
                סוברט אלית גול
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" md="3">
            <v-card
              tile
              elevation="10"
              :class="
                $vuetify.breakpoint.mdAndDown
                  ? 'px-2 py-2 mb-6 card'
                  : 'px-5 py-8 mb-6 mx-5 card'
              "
            >
              <v-img
                class="mx-auto my-4"
                :height="$vuetify.breakpoint.mdAndDown ? '75px' : '65%'"
                :width="$vuetify.breakpoint.mdAndDown ? '75px' : '55%'"
                src="../assets/hands-icon.svg"
                alt="icon"
              />
              <v-card-text>
                לורם איפסום דולור סיט אמט, קונסקטו אדיפיסינג אלית גולר מונפרר
                סוברט אלית גול
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <img
        v-if="$vuetify.breakpoint.mdAndUp"
        src="../assets/bike.svg"
        class="bike-img"
        height="50%"
      />
      <img
        v-if="$vuetify.breakpoint.mdAndUp"
        src="../assets/bulb.svg"
        class="bulb"
        height="95%"
      />
      <img
        v-if="$vuetify.breakpoint.mdAndDown"
        src="../assets/bulb-mobile.svg"
        class="mobile-bulb"
      />
    </v-container>
    <v-container fluid class="pt-0 register">
      <h4 class="white--text text-h5 text-md-h4 font-weight-bold mt-15">
        רוצה לקבל התראות מיידיות על תכנית בינוי ופיתוח בכל מקום שמעניין אותך
      </h4>
      <v-btn
        rounded
        color="secondary"
        x-large
        class="register-btn mt-6 mb-15"
        width="20%"
        height="17%"
      >
        הרשם עכשיו
      </v-btn> </v-container
    >-
    <v-container fluid class="px-0 p-relative">
      <v-container class="px-16 text-start">
        <p
          :class="
            $vuetify.breakpoint.mdAndUp
              ? 'mt-6 mb-16 pb-16 px-16 primary--text end-p'
              : 'primary--text'
          "
        >
          לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד
          אדנדום סילקוף, מרגשי ומרגשח. עמחליף לורם איפסום דולור סיט אמט,
          קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס
          וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום
          סוליסי טידום בעליק. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג
          אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום
          אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק ה
          סטום, לפריקך תצטריק לרטי. הועניב היושבב שערש שמחויט - שלושע ותלברו
          חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה
          ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק. ולהע צופעט למרקוח
          איבן איף, ברומץ כלרשט מיחוצים. קלאצי ליבם סולגק. בראיט ולחת צורק
          מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג
          ישבעס.. קונדימנטום קורוס בליקרה, נונסטי קלובר בר
        </p>
        <img
          v-if="$vuetify.breakpoint.mdAndUp"
          src="../assets/family.svg"
          class="family"
          height="540vh"
        />
      </v-container>
      <v-img
        v-if="$vuetify.breakpoint.mdAndDown"
        src="../assets/bike-mobile.svg"
        height="240px"
      />
    </v-container>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";

@Component()
export default class LandingPage extends Vue {}
</script>

<style scoped>
.hero {
  z-index: 2;
  position: relative;
  height: 45vh;
  background-color: var(--v-lightBg-base);
}
.h1-lg {
  font-size: 73px;
}
.h1-sm {
  font-size: 41px;
  line-height: 1;
}
.input-lg {
  width: 50vw;
  margin: 0 auto;
}
.btn-lg {
  left: 0;
  top: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.xlg-container {
  max-width: 1450px;
}
.card {
  z-index: 2;
}
.of-hidden {
  overflow: hidden;
}
.bike-img {
  position: absolute;
  bottom: -2.5%;
  right: 0;
}
.bulb {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.mobile-bulb {
  position: absolute;
  bottom: -50%;
  right: -170%;
  z-index: 1;
}
.register {
  width: 100vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/blue-banner.svg");
  background-position-y: top;
  background-position-x: 60%;
  background-size: cover;
}
.register-btn {
  font-size: 30px;
  font-family: "Assitant", sans-serif;
  letter-spacing: 1px;
}
.end-p {
  max-width: 55vw;
  margin: 0 auto;
}
.family {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
