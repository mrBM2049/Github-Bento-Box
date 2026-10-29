import { forwardRef } from "react";
import { motion } from "framer-motion";
import { containerVariants } from "../constants/motion";
import { BioQuoteTile } from "./tiles/BioQuoteTile";
import { ProfileIdentityTile } from "./tiles/ProfileIdentityTile";
import { TallScoreCard } from "./tiles/TallScoreCard";
import { LanguageDeckTile } from "./tiles/LanguageDeckTile";
import { BentoProjectTile } from "./tiles/BentoProjectTile";
import { PinnedReposTile } from "./tiles/PinnedReposTile";

export const BentoContainer = forwardRef(function BentoContainer(
  { data, onExport, isExporting },
  ref
) {
  const { profile, totalStars, topRepos, isPinned, topLanguages, impactRating, contributions } = data;

  return (
    <motion.div
      ref={ref}
      key={profile?.login}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 w-full select-none"
    >
      {/* Row 1 */}
      <BioQuoteTile profile={profile} />
      <ProfileIdentityTile profile={profile} />
      <TallScoreCard
        profile={profile}
        totalStars={totalStars}
        impactRating={impactRating}
        contributions={contributions}
      />

      {/* Row 2 */}
      <LanguageDeckTile topLanguages={topLanguages} />

      {/* Row 3 */}
      <BentoProjectTile />
      <PinnedReposTile
        topRepos={topRepos}
        isPinned={isPinned}
        onExport={onExport}
        isExporting={isExporting}
      />
    </motion.div>
  );
});
