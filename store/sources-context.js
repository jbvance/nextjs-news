import { createContext, useState, useEffect } from 'react';

const SourcesContext = createContext({
  sources: [],
  loadSources: function () {}
});

export function SourcesContextProvider(props) {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    if (!sources || sources.length === 0) {
      loadSourcesHandler();
    }
  }, [sources]);

  async function loadSourcesHandler() {
    const response = await fetch('/api/news/sources');
    const results = await response.json();
    setSources(results.data);
  }

  const context = {
    sources,
    loadSources: loadSourcesHandler
  };

  return (
    <SourcesContext.Provider value={context}>
      {props.children}
    </SourcesContext.Provider>
  );
}

export default SourcesContext;
