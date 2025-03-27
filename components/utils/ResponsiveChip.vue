<template>
	<DevOnly>
		<div
			class="fixed right-1 bottom-1 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-sm text-white"
		>
			<div class="block sm:hidden">xs</div>
			<div class="hidden sm:block md:hidden">sm</div>
			<div class="hidden md:block lg:hidden">md</div>
			<div class="hidden lg:block xl:hidden">lg</div>
			<div class="hidden xl:block 2xl:hidden">xl</div>
			<div class="hidden 2xl:block">2xl</div>
		</div>
	</DevOnly>
</template>
