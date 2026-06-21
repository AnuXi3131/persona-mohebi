function NotFound() {
  return /*html*/ `
        <section class="animate-fade-in relative">
          <div class="absolute bg-background z-[-1] bottom-0 right-1/2 translate-x-1/2 rotate-20 hidden md:block blur-3xl">
            <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="aspect-video w-288.75 bg-linear-to-b from-primary to-accent opacity-10"></div>
          </div>
          <div class="mt-50">
            <div class="container px-4">
                <div class="flex flex-col gap-10">
                  <h1 class="text-center text-4xl md:text-5xl lg:text-6xl">صفحه مورد نظر پیدا نشد !</h1>
                  <div class="flex flex-col justify-center text-center text-7xl md:text-9xl font-bold font-montserrat">
                    <div class="text-accent" style="clip-path:inset(0 0 50% 0)">
                      <span>4</span>
                      <span>0</span>
                      <span>4</span>
                    </div>
                    <div class="text-primary -translate-y-16 md:-translate-y-30 md:-translate-x-4" style="clip-path:inset(50% 0 0 0)">
                      <span>4</span>
                      <span>0</span>
                      <span>4</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    `;
}

export default NotFound;
