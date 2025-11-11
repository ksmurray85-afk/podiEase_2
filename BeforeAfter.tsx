import beforeAfterImage from "/attached_assets/before.jpg";

export function BeforeAfter() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs sm:text-sm font-medium tracking-wider mb-4 uppercase" style={{ color: '#593f32' }}>
            Real Results, Real Relief
          </p>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#283653' }} data-testid="text-transformation-heading">
            Your Journey to Pain-Free Living
          </h2>
          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed" data-testid="text-transformation-subheading">
            See the difference our podiatrist-selected products can make in your daily life
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-xl">
          <img 
            src={beforeAfterImage} 
            alt="Before and after transformation showing man in pain becoming active and happy"
            className="w-full h-auto"
            data-testid="image-before-after"
          />
          
          <div className="absolute inset-0 flex">
            <div className="flex-1 flex flex-col items-center justify-start pt-8 md:pt-12">
              <div className="text-center space-y-2">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" data-testid="text-before-heading">
                  BEFORE
                </h3>
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]" data-testid="text-limitation">
                  LIMITATION.
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-start pt-8 md:pt-12">
              <div className="text-center space-y-2">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary drop-shadow-[0_4px_12px_rgba(255,255,255,0.9)]" data-testid="text-after-heading">
                  AFTER
                </h3>
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#0a1628] drop-shadow-[0_3px_10px_rgba(255,255,255,0.8)]" data-testid="text-possibility">
                  POSSIBILITY.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg md:text-xl text-foreground/70 italic font-medium">
            "Relief isn't just about reducing pain—it's about reclaiming your life"
          </p>
        </div>
      </div>
    </section>
  );
}
