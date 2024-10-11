import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as qs from 'qs';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';

dotenv.config();

@Injectable()
export class AuthService {
  private readonly envFilePath = path.join(__dirname, '../../../.env');

  async login(): Promise<any> {
    const loginUrl = 'https://integration.cybereason.net:8443/login.html';
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;

    const jar = new CookieJar();
    const axiosInstance = wrapper(axios.create({ jar })) as any; 

    try {
      const response = await axiosInstance.post(loginUrl, qs.stringify({
          username,
          password,
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        });

      console.log(response);
      const cookies = await jar.getCookieString(loginUrl);
      await this.storeCookies(cookies);

      // Handle cookies or session ID as needed here
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      } else {
        console.error('Error message:', error.message);
      }
      throw new HttpException('Login request failed', HttpStatus.UNAUTHORIZED);
    }
  }

  private async storeCookies(cookies: string) {
    const envContent = await fs.promises.readFile(this.envFilePath, 'utf8');
    const updatedContent = envContent.replace(/COOKIES=.*/, `COOKIES="${cookies}"`);
    await fs.promises.writeFile(this.envFilePath, updatedContent, 'utf8');
  }
}
