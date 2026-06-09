import { useFetchers, useNavigation } from "react-router";
import { useEffect, useMemo } from "react";
import NProgress from "nprogress";

import "./styles.css";

function ProgressBar() {
  const navigation = useNavigation();
  const fetchers = useFetchers();

  let state = useMemo<"idle" | "loading">(
    function getGlobalState() {
      let states = [
        navigation.state,
        ...fetchers.map((fetcher) => fetcher.state),
      ];
      if (states.every((state) => state === "idle")) return "idle";
      return "loading";
    },
    [navigation.state, fetchers]
  );

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    if (state === "loading") NProgress.start();
    if (state === "idle") NProgress.done();
  }, [state]);

  return <></>;
}

export { ProgressBar };
