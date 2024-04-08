# 使用官方 Node.js 镜像作为基础镜像
FROM node:lts-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建 Nuxt 应用
RUN npm run build

# 设置环境变量
ENV HOST 0.0.0.0
ENV PORT 80

# 启动 Nuxt 应用
CMD ["node", ".output/server/index.mjs"]