<template>
  <v-container fluid class="pa-0">
    <v-layout justify-center align-center column class="hero" tag="section">
      <h1>
        ברוכים הבאים
        <span>לועדה פתוחה</span>
      </h1>
      <h2>המקום שלך להשפיע על תהליכי תכנון ובניה בישוב, באזור ובמדינה</h2>
    </v-layout>
    <v-layout justify-center class="search">
      <h4>רוצה לדעת מה בונים לידך?</h4>
      <!--      <v-img-->
      <!--        src="../assets/green.svg"-->
      <!--        class="grass"-->
      <!--      />-->
    </v-layout>
    <v-container align-center justify-center tag="section">
      <p>
        ועדה פתוחה היא פלטפורמה להשפעה על תהליכי התכנון והבנייה. המערכת , מנגישה
        את סדרי היום של ועדות התכנון ומאפשרת לכם - תושבות ותושבים פעילי סביבה,
        מתכננות, מתכננים, אדריכלים ואנשי מקצוע אחרים - להשתתף . באופן פעיל
        בתהליכי קבלת ההחלטות בתחום ועדה פתוחה הוקמה על ידי חיים וסביבה, ארגון
        הגג של ארגוני הסביבה בישראל, והיא פועלת בשיתוף עם נציגי הארגונים
        הסביבתיים היושבים בוועדות התכנון על פי חוק הייצוג. ועדה פתוחה מיועדת
        להיות מרחב לדיון מכבד ומקדם פתרונות. הדברים שתפרסמו במערכת יגיעו לידי
        מקבלי ההחלטות ויוכלו להשפיע על עמדותיהם. לכן חשוב לנו לשמור על מרחב נקי
        מהתלהמות ומתוקפנות. לנציגי ונציגות הוועדות הזכות להגיב ולהתייחס לדברים
        שתכתבו, אבל הם אינם מחויבים לכך. ככל שהדברים יובאו בצורה מכבדת ומקצועית
        כך סיכוייהם , להשפיע יגדלו. זוהי אינה פלטפורמה להבעת מחאה אלא להשתתפות
        ולדיון .ונודה לכם אם תכבדו זאת
      </p>
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
  font-family: "Heebo" sans-serif;
  /*background: url("../assets/green.svg") center center no-repeat;*/
}
h1 {
  /*margin: 5% 0;*/
  font-size: 73px;
  color: var(--v-primary-base);
  font-weight: 900;
}
span {
  color: var(--v-secondary-base);
}
h2 {
  font-size: 34px;
  color: var(--v-primary-base);
  font-weight: 400;
}
.search {
  position: relative;
  height: 35vh;
  overflow: visible;
}
h4 {
  z-index: 2;
}
.grass {
  position: absolute;
  z-index: 1;
  height: 70vh;
  /*width: 110vw;*/
}
</style>
