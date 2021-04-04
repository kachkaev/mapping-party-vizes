import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import { getFeatureCollectionWithBuildings } from "../shared/getFeatureCollectionWithBuildings";
import { getFeatureCollectionWithMappingCake } from "../shared/getFeatureCollectionWithMappingCake";
import { getFeatureWithTerritoryExtent } from "../shared/getFeatureWithTerritoryExtent";
import { PageContentsForMapComparisonProps } from "../ui/PageContentsForMapComparison";
import { PageMetadata } from "../ui/PageMetadata";

const PageContentsForMapComparison = dynamic<PageContentsForMapComparisonProps>(
  import("../ui/PageContentsForMapComparison").then(
    (m) => m.PageContentsForMapComparison,
  ),
  { ssr: false },
);

type MapComparisonPageProps = PageContentsForMapComparisonProps;

const MapComparisonPage: NextPage<MapComparisonPageProps> = (props) => {
  return (
    <>
      <PageMetadata />
      <PageContentsForMapComparison {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<MapComparisonPageProps> = async () => {
  return {
    props: {
      buildingCollectionStart: await getFeatureCollectionWithBuildings("start"),
      buildingCollectionFinish: await getFeatureCollectionWithBuildings(
        "finish",
      ),
      mappingCake: await getFeatureCollectionWithMappingCake(),
      territoryExtent: await getFeatureWithTerritoryExtent(),
    },
  };
};

export default MapComparisonPage;
