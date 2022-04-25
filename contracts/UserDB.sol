// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

contract UserDB {
    struct User {
        uint256 userID;
        string name;
        string lastName;
        int256 dateOfBirth;
        string color;
        string says;
        string[3] topics;
    }
    User[] public users;
    error Max7UsersCanBeSaved();
    event NewUserSaved(uint256 user_id);

    constructor() {
        users.push(
            User(
                0,
                "Ozdemir",
                "Asaf",
                -1466671836000,
                "blue",
                "I will hide you, believe me. In what I write, in what I draw. In what I sing, in what I say.",
                ["poems","literature","instabook"]
            )
        );
    }

    function saveUser(
        string memory name,
        string memory last_name,
        int256 date_of_birth,
        string memory _color,
        string memory _says,
        string[3] memory _topics
    ) external {
        if (users.length > 7) {
            revert Max7UsersCanBeSaved();
        }
        uint256 user_id = users.length;
        users.push(
            User(
                user_id,
                name,
                last_name,
                date_of_birth,
                _color,
                _says,
                _topics
            )
        );
        emit NewUserSaved(user_id);
    }

    function getAllUsers() external view returns (User[] memory) {
        return users;
    }
}
