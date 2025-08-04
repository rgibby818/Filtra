# filtra

A web app written in vue that allows you to apply filters to images.



## Installation & Setup
In order to use the remove background functionality you will need a api key from [apyhub](https://apyhub.com/utility/image-processor-remove-background). While it is not needed to run the application. It is needed to have full functionality.

You will need to have nodejs installed on your machine. Run one of the following commands to install nodejs onto your machine if you need to install it.

```
# Windows
curl.exe https://webi.ms/node | powershell
```
```
# MacOS or Linux
curl -sS https://webi.sh/node | sh; \
source ~/.config/envman/PATH.env
```

Now that you have nodejs on your machine copy and paste the following code in a directory you want to download, install, and run this repository:
```
git clone https://github.com/rgibby818/Filtra.git
cd Filtra/
chmod +x ./run.sh ./cleanup.sh
./setup.sh
```
You will be prompted to paste your api key inside the script. If you select no and want to add it later. copy and paste this code below replacing YOUR_API_KEY with your api key.
```
echo "API_KEY=YOUR_API_KEY" > .env
```

Now you can navigate to [HERE](localhost:3000) to start using this application.

> [!TIP]
> To stop the server in your terminal press Ctrl + c

>[!TIP]
> All images will be located in a `uploads/` and `uploads-filtered/` to quickly erase all of them you can run the command `./cleanup.sh`.