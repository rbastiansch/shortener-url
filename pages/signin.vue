<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
        <v-form ref="form" v-model="valid">
            <div class="signin__form__grid">
            
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>
                
                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    :counter="10"
                    label="Password"
                    required
                ></v-text-field>
                
                <v-btn
                    color="#012a35"
                    @click="signIn"
                >
                    SignIn
                </v-btn>
            </div>
        </v-form>
    </v-col>
  </v-row>
</template>

<script>
import UrlShortener from '~/services/backendMock'

export default {
    layout: 'logged',
    // middleware: 'validateSignin.middleware',
    data () {
        return {
            valid: false,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length <= 10 || 'Password must be less than 10 characters',
            ]
        }
    },
    methods: {
        signIn () {
            this.$refs.form.validate()
            if (!this.valid) {
                return
            }
            const { email, password } = this

            const user = {
                email,
                password
            }

            const response = UrlShortener.signIn(user)
            if (!response) {
                return
            }

            this.$store.commit('setUserLogged', user)
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.signin__form__grid {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    grid-column-gap: 25px;
    align-items: center;
}

.signin__form__grid .v-btn {
    color: white;
}
</style>