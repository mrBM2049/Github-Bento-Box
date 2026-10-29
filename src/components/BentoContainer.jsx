import { forwardRef } from "react";
import { motion } from "framer-motion";
import { containerVariants } from "../constants/motion";
import { BrandMarkTile } from "./tiles/BrandMarkTile";
import { HandleSearchTile } from "./tiles/HandleSearchTile";
import { TallScoreCard } from "./tiles/TallScoreCard";
import { LanguageDeckTile } from "./tiles/LanguageDeckTile";
import { AvatarPortraitTile } from "./tiles/AvatarPortraitTile";
import { BioQuoteTile } from "./tiles/BioQuoteTile";
import { FeaturedRepoTile } from "./tiles/FeaturedRepoTile";

export const BentoContainer = forwardRef(function BentoContainer(
  { data, onSearch, onExport, isExporting },
  ref
) {
  const { profile, totalStars, topRepo, topLanguages, impactRating } = data;

  return (
    <motion.div
      ref={ref}
      key={profile?.login}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 w-full select-none"
    >
      <BrandMarkTile login={profile?.login} />
      <HandleSearchTile
        login={profile?.login}
        name={profile?.name}
        onSearch={onSearch}
      />
      <TallScoreCard
        profile={profile}
        totalStars={totalStars}
        impactRating={impactRating}
      />
      <LanguageDeckTile topLanguages={topLanguages} />
      <AvatarPortraitTile profile={profile} />
      <BioQuoteTile profile={profile} />
      <FeaturedRepoTile
        topRepo={topRepo}
        onExport={onExport}
        isExporting={isExporting}
      />
    </motion.div>
  );
});
