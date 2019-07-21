<template>
  <section 
    class="hero is-success is-fullheight"
    v-if="pageLoader_isDataLoaded"
  >
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please register to proceed.</p>
          <div class="box">
            <figure class="avatar">
                <img src="https://placehold.it/128x128">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="text"
                         placeholder="Username"
                         v-model="form.username"
                         @blur="$v.form.username.$touch()"
                  >
                  <div
                    class="form-error"
                    v-if="$v.form.username.$error"
                  >
                    <span 
                      class="help is-danger"
                      v-if="!$v.form.username.required"
                    >
                      Username is required
                    </span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="text"
                         placeholder="Name"
                         v-model="form.name"
                         @blur="$v.form.name.$touch()"
                  >
                  <div
                    class="form-error"
                    v-if="$v.form.name.$error"
                  >
                    <span 
                      class="help is-danger"
                      v-if="!$v.form.name.required"
                    >
                      Name is required
                    </span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="email"
                         placeholder="Your Email"
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
                  <input class="input is-large"
                         type="text"
                         placeholder="Avatar"
                         autocomplete=""
                         v-model="form.avatar"
                         @blur="$v.form.avatar.$touch()"
                  >
                  <div
                    class="form-error"
                    v-if="$v.form.avatar.$error"
                  >
                    <span 
                      class="help is-danger"
                      v-if="!$v.form.avatar.url"
                    >
                      Url format is not valid
                    </span>
                    <span 
                      class="help is-danger"
                      v-if="!$v.form.avatar.supportedFileType"
                    >
                      Selected file type is not valid
                    </span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="password"
                         placeholder="Your Password"
                         autocomplete="new-password"
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
                    <span 
                      class="help is-danger"
                      v-if="!$v.form.password.minLength"
                    >
                      Password minimum length is 6 letters
                    </span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="password"
                         placeholder="Password Confirmation"
                         autocomplete="off"
                         v-model="form.passwordConfirmation"
                         @blur="$v.form.passwordConfirmation.$touch()"
                  >
                  <div
                    class="form-error"
                    v-if="$v.form.passwordConfirmation.$error"
                  >
                    <span 
                      class="help is-danger"
                      v-if="!$v.form.passwordConfirmation.required"
                    >
                      Password is required
                    </span>
                    <span 
                      class="help is-danger"
                      v-if="!$v.form.passwordConfirmation.sameAsPassword"
                    >
                      Should match to the Password
                    </span>
                  </div>
                </div>
              </div>
              <button 
                type="submit" 
                class="button is-block is-info is-large is-fullwidth"
                @click.prevent="register"
                :disabled="isFormInvalid"
              >
                Register
              </button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link 
              :to="{name: 'PageLogin'}"
            >
              Login
            </router-link> &nbsp;·&nbsp;
            <a>Sign Up With Google</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import pageLoader from "@/mixins/pageLoader"

  import { mapActions } from 'vuex'
  import { required, email, minLength, url, sameAs } from "vuelidate/lib/validators";
  import { supportedFileType } from "@/helpers/validators";


  export default {
    mixins: [pageLoader],
    data() {
      return {
        form: {
          username: null,
          name: null,
          email: null,
          avatar: null,
          password: null,
          passwordConfirmation: null,
        }
      }
    },
    created() {
      this.pageLoader_resolveData()
    },
    validations: {
      form: {
        username: {
          required
        },
        name: {
          required
        },
        email: {
          required,
          email
        },
        avatar: {
          url,
          supportedFileType
        },
        password: {
          required,
          minLength: minLength(6)
        },
        passwordConfirmation: {
          required,
          sameAsPassword: sameAs('password')
        },
      }
    },
    computed: {
      isFormInvalid() {
        return this.$v.form.$invalid
      }
    },
    methods: {
      register() {
        this.$v.form.$touch()
        this.$store.dispatch('auth/registerUser', this.form)
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