const { scrollYProgress } = useScroll();

  // Animation ranges (0-1 scale)
  const introRange = [0, 0.33];
  const skillsRange = [0.33, 0.66];
  const projectsRange = [0.66, 1];

  // Intro section effects
  const introY = useTransform(
    scrollYProgress,
    [introRange[0], introRange[1], skillsRange[0]],
    ["0%", "-20%", "-100%"]
  );
  const introOpacity = useTransform(
    scrollYProgress,
    [introRange[0], introRange[1], skillsRange[0]],
    [1, 1, 0]
  );
  const introScale = useTransform(
    scrollYProgress,
    [introRange[0], introRange[1]],
    [1, 0.95]
  );

  // Skills section effects
  const skillsY = useTransform(
    scrollYProgress,
    [introRange[1], skillsRange[0], skillsRange[1], projectsRange[0]],
    ["100%", "0%", "0%", "-100%"]
  );
  const skillsOpacity = useTransform(
    scrollYProgress,
    [introRange[1], skillsRange[0], skillsRange[1], projectsRange[0]],
    [0, 1, 1, 0]
  );

  // Projects section effects
  const projectsY = useTransform(
    scrollYProgress,
    [skillsRange[1], projectsRange[0], projectsRange[1]],
    ["100%", "0%", "-20%"]
  );
  const projectsOpacity = useTransform(
    scrollYProgress,
    [skillsRange[1], projectsRange[0], projectsRange[1]],
    [0, 1, 1]
  );

  // Background effects
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#000000", "#111111", "#222222"]
  );

  return (
    <motion.main className="relative" style={{ backgroundColor: bgColor }}>
      {/* Scrollable content container */}
      <div className="h-[300vh] relative">
        {/* Sticky viewport container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Intro section - highest z-index when active */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              y: introY,
              opacity: introOpacity,
              scale: introScale,
              zIndex: useTransform(scrollYProgress, (val) =>
                val < skillsRange[0] ? 30 : 10
              ),
            }}
          >
            <Intor />
          </motion.div>

          {/* Skills section - middle z-index */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              y: skillsY,
              opacity: skillsOpacity,
              zIndex: useTransform(scrollYProgress, (val) =>
                val >= skillsRange[0] && val < projectsRange[0] ? 30 : 20
              ),
            }}
          >
            <Skills />
          </motion.div>

          {/* Projects section - lowest z-index when active */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              y: projectsY,
              opacity: projectsOpacity,
              zIndex: useTransform(scrollYProgress, (val) =>
                val >= projectsRange[0] ? 30 : 10
              ),
            }}
          >
            <Projects />
          </motion.div>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed bottom-4 left-4 h-1 bg-white rounded-full z-50"
        style={{
          width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
        }}
      />
    </motion.main>