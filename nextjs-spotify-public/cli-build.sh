docker build . --build-arg ACCESS_KEY=$ACCESS_KEY \
    --build-arg SECRET=$SECRET_KEY \
    --build-arg TABLE=$TABLE \
    --build-arg TABLE_INDEX=$TABLE_INDEX \
    --build-arg REGION=$REGION \
    --build-arg DEVICE_DESKTOP=$DEVICE_DESKTOP \
    --build-arg DEVICE_LAPTOP=$DEVICE_LAPTOP \
    --build-arg DEVICE_SAMSUNG=$DEVICE_SAMSUNG \
    --build-arg DEVICE_TABLET=$DEVICE_TABLET

# PowerShell
docker build . `
    --build-arg ACCESS_KEY= `
    --build-arg SECRET_KEY= `
    --build-arg DEVICE_DESKTOP= `
    --build-arg DEVICE_LAPTOP= `
    --build-arg DEVICE_PIXEL= `
    --build-arg DEVICE_SAMSUNG= `
    --build-arg DEVICE_TABLET= `
    --build-arg LATEST_MONTH= `
    --build-arg LATEST_YEAR= `
    --build-arg REGION= `
    --build-arg REDIS_HOST= `
    --build-arg REDIS_PORT= `
    --build-arg REDIS_PASSWORD= `
    --build-arg REDIS_EXPIRE_CURRENT_MONTH= `
    --build-arg TABLE= `
    --build-arg TABLE_INDEX=