const useRouter = () => {
  const push = (url: string) => {
    window.history.pushState({}, '', url);
    window.location.href = window.location.pathname;
  };

  return { push };
};

export { useRouter };
