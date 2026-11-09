import { MorphingInfinity } from '../../components/loading-ui/morphing-infinity';
import CountUp from './ui/CountUp';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-sm">
      <div className="text-muted-foreground flex items-center gap-2">
        <MorphingInfinity className="size-6 shrink-0" />
        <span>Thinking</span>
      </div>
      <div className="text-xs text-muted-foreground/80 font-medium">
        <CountUp
          from={0}
          to={100}
          separator=","
          direction="up"
          duration={15}
          className="count-up-text inline-block"
        />
        <span>%</span>
      </div>
    </div>
  );
};

export default Loader;
