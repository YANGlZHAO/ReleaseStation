<template>
	<div class="svg-icon">
		<svg v-if="icon === 'search'" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem"
			viewBox="0 0 24 24">
			<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
				<path stroke-dasharray="40" stroke-dashoffset="40"
					d="M10.76 13.24c-2.34 -2.34 -2.34 -6.14 0 -8.49c2.34 -2.34 6.14 -2.34 8.49 0c2.34 2.34 2.34 6.14 0 8.49c-2.34 2.34 -6.14 2.34 -8.49 0Z">
					<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="40;0" />
				</path>
				<path stroke-dasharray="12" stroke-dashoffset="12" d="M10.5 13.5l-7.5 7.5">
					<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0" />
				</path>
			</g>
		</svg>

		<svg v-else-if="icon === 'list'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			class="animated-list-icon">
			<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
				<path d="M4 5h0.01" class="dot line-1" />
				<path d="M8 5h12" class="line line-1" />
				<path d="M4 10h0.01" class="dot line-2" />
				<path d="M8 10h12" class="line line-2" />
				<path d="M4 15h0.01" class="dot line-3" />
				<path d="M8 15h12" class="line line-3" />
				<path d="M4 20h0.01" class="dot line-4" />
				<path d="M8 20h12" class="line line-4" />
			</g>
		</svg>


		<svg v-else-if="icon === 'file'" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem"
			viewBox="0 0 24 24">
			<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
				<path stroke-dasharray="64" stroke-dashoffset="64"
					d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z">
					<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
				</path>
				<path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity="0">
					<animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s"
						values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z" />
					<set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
				</path>
				<path stroke-dasharray="8" stroke-dashoffset="8" d="M9 13h6">
					<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="8;0" />
				</path>
				<path stroke-dasharray="4" stroke-dashoffset="4" d="M9 17h3">
					<animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="4;0" />
				</path>
			</g>
		</svg>

		<svg v-else-if="icon === 'notification'" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem"
			viewBox="0 0 24 24">
			<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
				<g>
					<path stroke-dasharray="4" stroke-dashoffset="4" d="M12 3v2">
						<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="4;0" />
					</path>
					<path stroke-dasharray="28" stroke-dashoffset="28"
						d="M12 5c-3.31 0 -6 2.69 -6 6l0 6c-1 0 -2 1 -2 2h8M12 5c3.31 0 6 2.69 6 6l0 6c1 0 2 1 2 2h-8">
						<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.4s"
							values="28;0" />
					</path>
					<animateTransform fill="freeze" attributeName="transform" begin="0.9s" dur="6s"
						keyTimes="0;0.05;0.15;0.2;1" type="rotate" values="0 12 3;3 12 3;-3 12 3;0 12 3;0 12 3" />
				</g>
				<path stroke-dasharray="8" stroke-dashoffset="8" d="M10 20c0 1.1 0.9 2 2 2c1.1 0 2 -0.9 2 -2">
					<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0" />
					<animateTransform fill="freeze" attributeName="transform" begin="1.1s" dur="6s"
						keyTimes="0;0.05;0.15;0.2;1" type="rotate" values="0 12 8;6 12 8;-6 12 8;0 12 8;0 12 8" />
				</path>
				<path stroke-dasharray="6" stroke-dashoffset="6" d="M22 6v4">
					<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="6;0" />
					<animate attributeName="stroke-width" begin="1.8s" dur="3s" keyTimes="0;0.1;0.2;0.3;1"
						repeatCount="indefinite" values="2;3;3;2;2" />
				</path>
				<path stroke-dasharray="2" stroke-dashoffset="2" d="M22 14v0.01">
					<animate fill="freeze" attributeName="stroke-dashoffset" begin="1.1s" dur="0.2s" values="2;0" />
					<animate attributeName="stroke-width" begin="2.1s" dur="3s" keyTimes="0;0.1;0.2;0.3;1"
						repeatCount="indefinite" values="2;3;3;2;2" />
				</path>
			</g>
		</svg>

		<svg v-else-if="icon === 'user'" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem"
			viewBox="0 0 24 24">
			<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
				<path stroke-dasharray="20" stroke-dashoffset="20"
					d="M3 21v-1c0 -2.21 1.79 -4 4 -4h4c2.21 0 4 1.79 4 4v1">
					<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0" />
				</path>
				<path stroke-dasharray="20" stroke-dashoffset="20"
					d="M9 13c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3Z">
					<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="20;0" />
				</path>
				<path stroke-dasharray="8" stroke-dashoffset="8" d="M15 6h6">
					<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="8;0" />
				</path>
				<path stroke-dasharray="8" stroke-dashoffset="8" d="M18 3v6">
					<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="8;0" />
				</path>
			</g>
		</svg>

		<svg v-else-if="icon === 'profile'" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem"
			viewBox="0 0 24 24">
			<g fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="2">
				<path stroke-dasharray="20" stroke-dashoffset="20"
					d="M12 5c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3Z">
					<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="20;0" />
				</path>
				<path stroke-dasharray="36" stroke-dashoffset="36" d="M12 14c4 0 7 2 7 3v2h-14v-2c0 -1 3 -3 7 -3Z">
					<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.5s" values="36;0" />
				</path>
				<animate fill="freeze" attributeName="fill-opacity" begin="1.1s" dur="0.5s" values="0;1" />
			</g>
		</svg>
		<svg v-else-if="icon === 'Poker'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path fill="currentColor"
				d="M10.951 15.893A5.83 5.83 0 0 1 7.5 17C4.462 17 2 14.761 2 12c0-3.548 3.525-6.089 6.644-8.338C9.92 2.742 11.129 1.872 12 1c.871.871 2.08 1.742 3.356 2.662C18.476 5.911 22 8.452 22 12c0 2.761-2.462 5-5.5 5a5.83 5.83 0 0 1-3.451-1.107c.284 1.646 1.009 2.82 1.794 4.092l.369.602c.384.636-.087 1.413-.83 1.413H9.618c-.743 0-1.214-.777-.83-1.413l.369-.602c.785-1.272 1.51-2.446 1.794-4.092" />
		</svg>
		<svg v-else-if="icon === 'Gift'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
				<path d="M3 9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm9-1v13" />
				<path
					d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7m2.5-4a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5" />
			</g>
		</svg>
		<svg v-else-if="icon === 'orange'" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
			viewBox="0 0 48 48">
			<g fill="none">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
					d="M41 26c0 9.941-6 18-17 18S7 35.94 7 26c0-3.68 1.104-7.102 3-9.953C13.225 11.197 17.74 13 24 13s10.775-1.803 14 3.047c1.895 2.85 3 6.273 3 9.953" />
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
					d="m26 13l3-4h-3l-2-2l-2 2h-3l3 4" />
				<circle cx="18" cy="20" r="2" fill="currentColor" />
				<circle cx="15" cy="27" r="2" fill="currentColor" />
				<circle cx="21" cy="25" r="2" fill="currentColor" />
				<circle cx="18" cy="32" r="2" fill="currentColor" />
			</g>
		</svg>
		<svg v-else-if="icon === 'WeChat'" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
			viewBox="0 0 24 24">
			<path fill="currentColor"
				d="M10.001 14.676v-.062c0-2.509 2.017-4.618 4.753-5.233C14.39 7.079 11.96 5.2 8.9 5.2C5.58 5.2 3 7.413 3 9.98c0 .969.36 1.9 1.04 2.698q.048.058.152.165a3.57 3.57 0 0 1 1.002 2.238a3.6 3.6 0 0 1 2.363-.442q.25.039.405.06A7.3 7.3 0 0 0 10 14.676m.457 1.951a9.2 9.2 0 0 1-2.753.055a19 19 0 0 1-.454-.067a1.6 1.6 0 0 0-1.08.212l-1.904 1.147a.8.8 0 0 1-.49.118a.79.79 0 0 1-.729-.851l.15-1.781a1.57 1.57 0 0 0-.439-1.223a6 6 0 0 1-.241-.262C1.563 12.855 1 11.473 1 9.979C1 6.235 4.537 3.2 8.9 3.2c4.06 0 7.403 2.627 7.85 6.008c3.371.153 6.05 2.515 6.05 5.406c0 1.193-.456 2.296-1.229 3.19q-.076.09-.195.21a1.24 1.24 0 0 0-.356.976l.121 1.423a.635.635 0 0 1-.59.68a.66.66 0 0 1-.396-.094l-1.544-.917a1.32 1.32 0 0 0-.874-.169q-.22.034-.368.053q-.475.061-.969.062c-2.694 0-4.998-1.408-5.943-3.401m6.977 1.31a3.3 3.3 0 0 1 1.675.174a3.25 3.25 0 0 1 .842-1.502q.076-.077.106-.112c.489-.565.743-1.213.743-1.883c0-1.805-1.903-3.414-4.4-3.414S12 12.81 12 14.614s1.903 3.414 4.4 3.414a6 6 0 0 0 .714-.046q.121-.015.32-.046" />
		</svg>
		<svg v-else-if="icon === 'purse'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
			<path fill="none" stroke="currentColor"
				d="M6 9h4m-4 2h4m-2 2V8.5m0 0L9.5 7M8 8.5L6.5 7M5 5c-.8-.8-.96-1.36-.8-1.743C4.44 2.68 5.4 2.5 6 2.5c1.055 0 1-1 2-1s1 1 2 1c.459 0 1.447.18 1.732.757c.19.384.068.943-.732 1.743m2.5 5c.424 2.97-1.91 4.5-5.5 4.5S2.076 12.97 2.5 10C3 6.5 5.37 4.5 8 4.5s5 2 5.5 5.5Z"
				stroke-width="1" />
		</svg>
		<svg v-else-if="icon === 'Cup'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<g fill="none" stroke="currentColor" stroke-width="1.5">
				<path
					d="M12 16c-5.76 0-6.78-5.74-6.96-10.294c-.051-1.266-.076-1.9.4-2.485c.475-.586 1.044-.682 2.183-.874A26.4 26.4 0 0 1 12 2c1.784 0 3.253.157 4.377.347c1.139.192 1.708.288 2.184.874s.45 1.219.4 2.485C18.781 10.26 17.761 16 12.001 16Z" />
				<path stroke-linecap="round" d="M12 16v3" />
				<path stroke-linecap="round" stroke-linejoin="round"
					d="M15.5 22h-7l.34-1.696a1 1 0 0 1 .98-.804h4.36a1 1 0 0 1 .98.804z" />
				<path
					d="m19 5l.949.316c.99.33 1.485.495 1.768.888S22 7.12 22 8.162v.073c0 .86 0 1.291-.207 1.643s-.584.561-1.336.98L17.5 12.5M5 5l-.949.316c-.99.33-1.485.495-1.768.888S2 7.12 2 8.162v.073c0 .86 0 1.291.207 1.643s.584.561 1.336.98L6.5 12.5m4.646-6.477C11.526 5.34 11.716 5 12 5s.474.34.854 1.023l.098.176c.108.194.162.29.246.354c.085.064.19.088.4.135l.19.044c.738.167 1.107.25 1.195.532s-.164.577-.667 1.165l-.13.152c-.143.167-.215.25-.247.354s-.021.215 0 .438l.02.203c.076.785.114 1.178-.115 1.352c-.23.174-.576.015-1.267-.303l-.178-.082c-.197-.09-.295-.135-.399-.135s-.202.045-.399.135l-.178.082c-.691.319-1.037.477-1.267.303s-.191-.567-.115-1.352l.02-.203c.021-.223.032-.334 0-.438s-.104-.187-.247-.354l-.13-.152c-.503-.588-.755-.882-.667-1.165c.088-.282.457-.365 1.195-.532l.19-.044c.21-.047.315-.07.4-.135c.084-.064.138-.16.246-.354z" />
				<path stroke-linecap="round" d="M18 22H6" />
			</g>
		</svg>
		<svg v-else-if="icon === 'News'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
				<path
					d="M15 18h-5m8-4h-8m-6 8h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
				<rect width="8" height="4" x="10" y="6" rx="1" />
			</g>
		</svg>
	</div>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				required: true
			}
		}
	};
</script>

<style scoped>
	.svg-icon {
		display: inline-block;
	}
	
	.animated-list-icon .line,
	.animated-list-icon .dot {
	  stroke-dasharray: 14;
	  stroke-dashoffset: 14;
	  animation: draw 0.4s ease forwards;
	}
	
	.animated-list-icon .line-2 { animation-delay: 0.2s; }
	.animated-list-icon .line-3 { animation-delay: 0.4s; }
	.animated-list-icon .line-4 { animation-delay: 0.6s; }
	
	@keyframes draw {
	  to {
	    stroke-dashoffset: 0;
	  }
	}

</style>