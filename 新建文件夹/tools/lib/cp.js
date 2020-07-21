/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import cp from 'child_process';
import execa from 'execa';

export const spawn = (command, args, options) =>
  execa(command, args, {
    stdio: ['ignore', 'inherit', 'inherit'],
    ...options,
  });

export const exec = (command, options) =>
  new Promise((resolve, reject) => {
    cp.exec(
      command,
      {
        stdio: ['ignore', 'inherit', 'inherit'],
        ...options,
      },
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({ stdout, stderr });
      },
    );
  });

export default { spawn, exec };
