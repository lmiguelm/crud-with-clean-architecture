import { PORT } from '../../utils/environments';

import { app } from './app';

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} 🚀`);
});
