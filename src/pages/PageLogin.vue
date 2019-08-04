<template>
  <section 
    class="hero is-success is-fullheight"
    v-if="pageLoader_isDataLoaded"
  >
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
                <img src="https://placehold.it/128x128">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input 
                    class="input is-large"
                    type="email"
                    placeholder="Your Email"
                    autofocus=""
                    autocomplete="email"
                    value=""
                    v-model="form.email"
                    @blur="$v.form.email.$touch()"
                  >
                  <div
                    class="form-error"
                    v-if="$v.form.email.$error"
                  >
                    <span 
                      class="help is-danger"
                      v-if="!$v.form.email.required"
                    >
                      Email is required
                    </span>
                    <span 
                      class="help is-danger"
                      v-if="!$v.form.email.email"
                      >
                      Email Address is not valid
                    </span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input 
                    class="input is-large"
                    type="password"
                    placeholder="Your Password"
                    autocomplete="current-password"
                    value=""
                    v-model="form.password"
                    @blur="$v.form.password.$touch()"
                  >
                  <div
                    class="form-error"
                    v-if="$v.form.password.$error"
                  >
                    <span 
                      class="help is-danger"
                      v-if="!$v.form.password.required"
                    >
                      Password is required
                    </span>
                  </div>
                </div>
              </div>
              <button 
                class="button is-block is-info is-large is-fullwidth"
                @click.prevent="login"
                :disabled="isFormInvalid"
              >
                Login
              </button>
            </form>
          </div>
          <p class="has-text-grey">
            <a>Sign In With Google</a> &nbsp;·&nbsp;
            <router-link 
              :to="{name: 'PageRegister'}"
            >
              Sign Up
            </router-link> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
  <div v-else>
    <AppSpinner />
  </div>
</template>

 <script>
  import pageLoader from "@/mixins/pageLoader"

  import { required, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [pageLoader],
    data() {
      return {
        form: {
          email: null,
          password: null
        }
      }
    },
    created() {
      this.pageLoader_resolveData()
    },
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    },
    computed: {
      isFormInvalid() {
        return this.$v.form.$invalid
      }
    },
    methods: {
      login() {
        this.$v.form.$touch()
        this.$store.dispatch('auth/loginWithEmailAndPassword', this.form)
          .then(() => this.$router.push('/'))
          .catch((err) => console.error(err))
      }
    }
  }
</script>

 <style scoped>
  .hero.is-success {
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>