import { PORT } from '../../utils/enviroments';

import { app } from './app';

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} 🚀`);
});
