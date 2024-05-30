<template>
	<div class="logo absolute top-5 right-5">
			<img src="../assets/logo-BS_Final.png" />
		</div>
	<div class="background min-h-screen flex flex-col items-center justify-center">
		<h1 class="denk-one-regular">Digital</h1>
		<h1 class="denk-one-regular">Sales Sheet</h1>
		<Card title="" class="w-1/3 m-5 relative">
			<div class="absolute top-0 right-1/2 transform translate-x-1/2 m-2 login">
				<img src="../assets/login.png">
			</div>
			<form class="flex flex-col space-y-4 shadow-inner m-8" @submit.prevent="submit">
				<FormControl required :type="'text'" size="md" variant="subtle" placeholder="johndoe@email.com"
					:disabled="false" label="" v-model="email" />
				<FormControl required :type="'password'" size="md" variant="subtle" placeholder="••••••"
					:disabled="false" label="" v-model="password" />
				<Button :loading="session.login.loading" variant="solid">Sign In</Button>
			</form>
		</Card>
	</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Denk+One&family=Jersey+25&display=swap');

.background {
	background: linear-gradient(to bottom, #ffffff, #ffffff 70%, #333 100%, #eee 75%);
}

.denk-one-regular {
  font-family: "Denk One", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 60px;
}

.logo {
	width: 5%
}

.login {
	width: 7%;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue'
import { FormControl } from 'frappe-ui';
import { session } from '../data/session'

let email = ref('')
let password = ref('')

function submit(e) {
	/* if (!email.value || !password.value) {
		return
	} */
	session.login.submit({
		email: email.value,
		password: password.value,
	})
}
</script>
