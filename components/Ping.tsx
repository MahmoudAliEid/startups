const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
        </span>
      </div>
    </div>
  );
};

export default Ping;
