type EnvConfig = {
  port: number;
  jwtSecret: string;
};

export const config = (): EnvConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET,
});
