import { OptimizersModule } from './optimizers.module';

describe('OptimizersModule', () => {
  let optimizersModule: OptimizersModule;

  beforeEach(() => {
    optimizersModule = new OptimizersModule();
  });

  it('should create an instance', () => {
    expect(optimizersModule).toBeTruthy();
  });
});
