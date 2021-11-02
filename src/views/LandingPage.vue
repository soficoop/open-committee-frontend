<template>
  <v-container dir="rtl" fluid class="pa-0 text-center landing-page">
    <v-container
      fluid
      :class="$vuetify.breakpoint.mdAndDown ? 'hero-mobile' : 'hero-desktop'"
    >
      <div class="px-3 header">
        <h1
          :class="
            $vuetify.breakpoint.mdAndUp
              ? 'h1-lg font-weight-black primary--text px-16'
              : 'h1-sm font-weight-black primary--text'
          "
        >
          ברוכים הבאים
          <br v-if="$vuetify.breakpoint.mdAndDown" />
          <span class="secondary--text">לועדה פתוחה</span>
        </h1>
        <h2 class="primary--text text-h6 text-md-h4 font-weight-regular px-10">
          המקום שלך להשפיע על תהליכי תכנון ובניה בישוב, באזור ובמדינה
        </h2>
      </div>
      <div>
        <h4 class="white--text text-h5 text-md-h4 font-weight-bold">
          רוצה לדעת מה בונים לידך?
        </h4>
        <v-combobox
          placeholder="הזן כתובת"
          rounded
          color="primary"
          background-color="white"
          :height="$vuetify.breakpoint.mdAndDown ? 41 : 60"
          :class="
            $vuetify.breakpoint.mdAndDown
              ? 'mb-0 mx-15 p-relative'
              : 'mb-0 input-lg'
          "
          :search-input.sync="searchText"
          @keydown.enter="runSearch"
          @change="handleSuggestionClicked"
          :items="searchSuggestions"
        >
          <template v-slot:append v-if="$vuetify.breakpoint.mdAndUp">
            <v-btn
              rounded
              depressed
              color="primary"
              height="60px"
              class="p-absolute btn-lg"
              @click="runSearch"
            >
              רוצה לראות מה בונים לידי
            </v-btn>
          </template>
        </v-combobox>
        <v-btn
          v-if="$vuetify.breakpoint.mdAndDown"
          rounded
          x-small
          max-width="50%"
          class="primary white--text mx-auto mb-5 py-4"
          @click="runSearch"
        >
          רוצה לראות מה בונים לידי
        </v-btn>
      </div>
    </v-container>
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
        <div
          :class="
            $vuetify.breakpoint.mdAndDown
              ? 'me-md-15 px-10 text-sm'
              : 'me-md-15 px-10 text-md'
          "
        >
          <p class="">
            ועדה פתוחה היא פלטפורמה חדשנית המאפשרת לך לקחת חלק פעיל בתהליכי
            התכנון והבנייה – בשלב שניתן להשפיע על התכניות באמת.
          </p>
          <p>
            איך זה עובד? הפלטפורמה הוקמה ע"י "<a
              href="https://www.sviva.net/"
              target="_blank"
              rel="noreferrer noopener"
              >חיים וסביבה</a
            >" ופועלת בשיתוף נציגי הארגונים הסביבתיים בוועדות התכנון. כל תכנית
            שעומדת לעלות לדיון באחת מוועדות התכנון והבניה מתעדכנת באפליקציה.
            במידה ותכנית זו רלוונטית לך, לפי הגדרת ההתראות שבאפשרותך לבחור, תשלח
            אליך הודעה מיידית ישירות למייל
          </p>
          <p>
            כל שנותר לך לעשות הוא להיכנס לפרטי התוכנית – באופן ישיר דרך מהמייל –
            ולעלות הצעה משלך לשיפור, במידת הצורך. נציג הציבור יקבל את ההצעה
            ויעלה אותה לדיון בהתאם לשיקול דעתו. אנו ממליצים לנמק את ההצעה באופן
            ברור ומקצועי וכמובן, לשמור על שפה מכובדת ומכבדת.
          </p>
          <p>
            אז למה אתם מחכים? בואו לקחת חלק משמעותי בתהליך התכנון והבניה בסביבה
            שלכם
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
    <v-container fluid class="p-relative">
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
          <v-col cols="6" md="3" v-for="card in cards" :key="card.text">
            <v-card
              tile
              elevation="10"
              :height="$vuetify.breakpoint.mdAndDown ? '248px' : '280px'"
              :class="
                $vuetify.breakpoint.mdAndDown
                  ? 'px-1 py-2 mb-6 card'
                  : 'px-5 py-5 mb-6 mx-5 card'
              "
            >
              <img
                class="mx-auto my-4"
                :height="$vuetify.breakpoint.mdAndDown ? '75px' : '105px'"
                :width="$vuetify.breakpoint.mdAndDown ? '75px' : '95px'"
                :src="require('../assets/' + card.img)"
                alt="icon"
              />
              <v-card-text v-text="card.text" />
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
    <v-container
      fluid
      :class="
        $vuetify.breakpoint.mdAndDown
          ? 'pt-0 register register-mobile'
          : 'pt-0 register register-desktop'
      "
    >
      <h4 class="white--text text-h5 text-md-h4 font-weight-bold mt-15 px-10">
        רוצה לקבל התראות מיידיות על תכנית בינוי ופיתוח בכל מקום שמעניין אותך
      </h4>
      <v-btn
        rounded
        color="secondary"
        x-large
        class="register-btn mt-6 mb-15"
        :width="$vuetify.breakpoint.mdAndDown ? '55vw' : '20vw'"
        to="/login"
      >
        הרשם עכשיו
      </v-btn> </v-container
    >-
    <v-container fluid class="px-0 p-relative">
      <v-container class="px-16 text-start">
        <div
          :class="
            $vuetify.breakpoint.mdAndUp
              ? 'mt-6 mb-16 pb-16 px-16 primary--text end-p text-md'
              : 'primary--text text-sm'
          "
        >
          <p>
            ועדה פתוחה היא פלטפורמה להשפעה על תהליכי התכנון והבנייה. המערכת
            מנגישה את סדרי היום של ועדות התכנון ומאפשרת לכם - תושבות ותושבים,
            פעילי סביבה, מתכננות, מתכננים, אדריכלים ואנשי מקצוע אחרים - להשתתף
            באופן פעיל בתהליכי קבלת ההחלטות בתחום.
          </p>
          <p>
            כאן תוכלו להירשם להתראות מדיוני הוועדות המחוזיות והארציות, ולקבל
            באימייל את רשימת התכניות שיועלו לדיוני הוועדות בזמן אמת. בעמודי
            התכניות תוכלו לכתוב את התייחסויותיכם לתכנית עוד לפני שלבי
            ההתנגדויות, וכך להביע את עמדתכם באופן אפקטיבי ובזמן רלוונטי.
          </p>
          <p>
            ועדה פתוחה הוקמה על ידי
            <a href="http://sviva.net" target="blank"> חיים וסביבה,</a>
            ארגון הגג של ארגוני הסביבה בישראל, והיא פועלת בשיתוף עם נציגי
            הארגונים הסביבתיים היושבים בוועדות התכנון על פי חוק הייצוג. נציגות
            ונציגי הארגונים יקבלו לקראת כל ישיבה את ההתייחסויות שתפרסמו, ועל פי
            שיקול דעתם יעלו אותן לדיון סביב שולחן הוועדה.
          </p>
          <p>
            ועדה פתוחה מיועדת להיות מרחב לדיון מכבד ומקדם פתרונות. הדברים
            שתפרסמו במערכת יגיעו לידי מקבלי ההחלטות ויוכלו להשפיע על עמדותיהם.
            לכן חשוב לנו לשמור על מרחב נקי מהתלהמות ומתוקפנות. לנציגי ונציגות
            הוועדות הזכות להגיב ולהתייחס לדברים שתכתבו, אבל הם אינם מחויבים לכך.
            ככל שהדברים יובאו בצורה מכבדת ומקצועית כך סיכוייהם להשפיע יגדלו.
            זוהי אינה פלטפורמה להבעת מחאה אלא להשתתפות ולדיון, ונודה לכם אם
            תכבדו זאת.
          </p>
          <p>
            פעילות המערכת מתאפשרת בזכות הנגשת המידע הגולמי לציבור הרחב על ידי
            מינהל התכנון, והיא פותחה בתמיכת רשות החדשנות הממשלתית.
          </p>
          <p>
            אנחנו מאמינים שבידי הציבור הרחב ידע רלוונטי וקריטי שיכול לשפר את
            תהליכי קבלת ההחלטות, לחסוך בכספי ציבור ולתרום לתכנון מתחשב יותר,
            מועיל יותר, וטוב יותר - לאדם, לחברה ולסביבה
          </p>
        </div>
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
import { Watch } from "vue-property-decorator";
import { debounce, makeGqlRequest } from "../helpers/functions";
import {
  autocompletePlansAndComments,
  // searchPlansAndComments
} from "../helpers/queries";

@Component()
export default class LandingPage extends Vue {
  loading = false;
  searchText = "";
  searchSuggestions = [];

  get cards() {
    return [
      {
        text: "מעורבות אמיתית בתהליכי תכנון ובניה בישוב שלך ובכל המדינה",
        img: "building-icon.svg",
      },
      {
        text: "השפעה על החלטות הרות גורל בלחיצת כפתור, בלי לצאת מהבית",
        img: "computer-icon.svg",
      },
      {
        text: "להיות חלק משמעותי בתהליכי התכנון והבינוי בכל מקום ובכל זמן",
        img: "people-icon.svg",
      },
      {
        text: "בפעם הראשונה, כוח משותף שיכול לשנות באמת ולשפר את איכות החיים של כולנו",
        img: "hands-icon.svg",
      },
    ];
  }

  handleSuggestionClicked(suggestion) {
    if (suggestion.value) {
      this.$router.push(`/plan/${suggestion.value}`);
    }
  }

  @Watch("searchText")
  handleSearchTextChanged() {
    debounce(this.autocompletePlansAndComments.bind(this), 100);
  }

  async autocompletePlansAndComments() {
    if (!this.searchText) {
      return;
    }
    this.loading = true;
    const result = await makeGqlRequest(autocompletePlansAndComments, {
      text: this.searchText,
    });
    this.searchSuggestions = [
      ...result.plans.map((plan) => ({
        text: plan.name,
        value: plan.id,
      })),
      ...result.comments.map((comment) => ({
        text: comment.title,
        value: comment.plan.id,
      })),
    ];
    this.loading = false;
  }

  runSearch() {
    this.$router.push({
      name: "search",
      params: { searchText: this.searchText },
    });
  }
}
</script>

<style scoped>
.landing-page {
  background: url("../assets/landingPageBg.png");
}
.hero-mobile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 937px;
  padding: 10vh 0 14vh 0;
  background-image: url("../assets/Mask-mobile.png");
  background-position: center -50px;
}
.hero-desktop {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  padding: 15vh 0 20vh 0;
  background-image: url("../assets/Mask-desktop.png");
  background-position: center;
  background-size: cover;
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
.text-sm {
  font-size: 15px;
}
.text-md {
  font-size: 18px;
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
  bottom: -10%;
  right: 0;
  z-index: 1;
}
.register {
  width: 100vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-position-y: top;
  background-position-x: 40%;
  background-size: cover;
}
.register-mobile {
  background-image: url("../assets/blue-banner-mobile.svg");
}
.register-desktop {
  background-image: url("../assets/blue-banner.svg");
}
.register-btn {
  font-size: 1.5rem;
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
